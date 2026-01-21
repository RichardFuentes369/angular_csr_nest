import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';

import { IsNull, Repository, UpdateResult } from 'typeorm';
import { Modulo } from './entities/modulo.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { I18nService } from 'nestjs-i18n';
import { Asignacion } from '@module/user/admin/permission/asignacion/entities/asignacion.entity';
import { EditModuloDto } from './dto/edit-modulo.dto';

@Injectable()
export class ModulosService {
  constructor(
    @Inject('PERMISO_MODULO_REPOSITORY')
    private moduloRepository: Repository<Modulo>,
    @Inject('PERMISO_ASIGNACION_REPOSITORY')
    private asignacionRepository: Repository<Asignacion>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  organizarJerarquia(data) {
    // Crear un mapa de todos los elementos por ID para acceder fácilmente
    const map = new Map();
    const roots = [];
  
    // Crear los nodos base (padres, hijos, nietos)
    data.forEach(item => {
      if (!item.mpm_modulo_padre_id) {
        map.set(item.mpm_id, { ...item, 'mpm_toogle': false, children: [] });
      }else{
        map.set(item.mpm_id, { ...item, children: [] });
      }
  
      // Si no tiene 'mpm_modulo_padre_id', es un padre y lo agregamos a roots
      if (!item.mpm_modulo_padre_id) {
        roots.push(map.get(item.mpm_id));
      }
    });
  
    // Ahora asignamos a cada hijo a su correspondiente padre
    data.forEach(item => {
      if (item.mpm_modulo_padre_id) {
        const parent = map.get(item.mpm_modulo_padre_id);
        if (parent) {
          parent.children.push(map.get(item.mpm_id));
        }
      }
    });
  
    return roots;
  }

  async findAllForUser(
    lang:string, 
    queryParams,
  ) {

    // Realizar la consulta
    const query = await this.moduloRepository.createQueryBuilder('mpm')
    .select([
      'mpm.modulo_padre_id',
      'mpm.id',
      'mpm.permiso',
      'mpm.nombre',
      'mpm.descripcion',
    ])
    .addSelect(subQuery => {
      return subQuery
        .select('CASE WHEN mpma.permiso IS NOT NULL THEN 1 ELSE 0 END as asignado')
        .from('mod_permisos_modulo_asignacion', 'mpma')
        .andWhere(`
          CASE WHEN mpm.modulo_padre_id IS NULL THEN
            mpma.modulo_padre_id IS NULL AND
            mpma.permiso = mpm.permiso
          ELSE
            mpma.permiso = mpm.permiso AND
            mpma.modulo_padre_id = mpm.modulo_padre_id
          END
        `)
        .andWhere('mpma.user_id = :userId', { userId: queryParams.userId })
    }, 'asignado')
    .getRawMany();


    console.log(query)

    const result = this.organizarJerarquia(query)

    return result;
  }

  async findPermiso(
    lang:string, 
    moduloId?: number, 
    permiso?: string, 
    opcion?: string
  ){
    
    let consulta = []

    if(isNaN(moduloId) && permiso == undefined && opcion == 'SEARCH'){
      const Modulos = await this.moduloRepository.createQueryBuilder('permiso')
      .where('permiso.modulo_padre IS NULL')
      .getRawMany();

      const SubModulos = await Promise.all(Modulos.map(async (permisosModulos) => {
        const permisosSubmodulos = await this.moduloRepository.createQueryBuilder('permiso')
          .where('permiso.modulo_padre = :moduloPadreId', { moduloPadreId: permisosModulos.permiso_id })
          .getMany();

        const Acciones = await Promise.all(permisosSubmodulos.map(async (submodulo) => {
          const permisosAcciones = await this.moduloRepository.createQueryBuilder('modulo')
            .where('modulo.modulo_padre = :submoduloId', { submoduloId: submodulo.id })
            .getMany();
          
          return { ...submodulo, permisosAcciones };
        }));

        return { ...permisosModulos, permisosSubmodulos: Acciones };
      }));

      return SubModulos;
    }

    if(moduloId == 0 && opcion == 'CREATE'){
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id IS NULL")
      .andWhere("modulo.permiso  = :permiso", { permiso: permiso })
      .getMany();
      
      if(consulta.length > 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_EXISTENTE', { lang }) }
      )
    }
    if(moduloId != 0 && opcion == 'CREATE'){
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.id = :idPadre", { idPadre: moduloId })
      .getMany();

      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_PADRE_NO_EXISTENTE', { lang }) }
      )

      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: moduloId })
      .andWhere("modulo.permiso = :permiso", { permiso: permiso })
      .getMany();

      if(consulta.length > 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_EXISTENTE', { lang }) }
      )
    }
    
    if(moduloId == 0 && opcion == 'DELETE'){
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id IS NULL")
      .andWhere("modulo.permiso = :permiso", { permiso: permiso })
      .getMany();
        
      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE', { lang }) }
      )

      let consulta2 = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: consulta[0].id })
      .getMany();
      
      if(consulta2.length > 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_TIENE_PERMISOS_HIJOS', { lang }) }
      )
    }
    if(moduloId != 0 && opcion == 'DELETE'){
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: moduloId })
      .getMany();

      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_PADRE_NO_EXISTENTE', { lang }) }
      )

      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: consulta[0].id })
      .getMany();

      if(consulta.length > 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_TIENE_PERMISOS_HIJOS', { lang }) }
      )

      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: moduloId })
      .andWhere("modulo.nombre_permiso = :permiso", { permiso: permiso })
      .getMany();

      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE', { lang }) }
      )
    }

    if(moduloId == 0 && opcion == 'SEARCH'){
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id IS NULL")
      .andWhere("modulo.permiso  = :permiso", { permiso: permiso })
      .getMany();

      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE', { lang }) }
      )
    }
    if(moduloId != 0 && opcion == 'SEARCH'){
      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.id = :idPadre", { idPadre: moduloId })
      .getMany();

      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_PADRE_NO_EXISTENTE', { lang }) }
      )

      consulta = await this.moduloRepository.createQueryBuilder("modulo")
      .where("modulo.modulo_padre_id = :idPadre", { idPadre: moduloId })
      .andWhere("modulo.permiso = :permiso", { permiso: permiso })
      .getMany();

      if(consulta.length == 0) throw new NotFoundException(
        this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE', { lang }) }
      )
    }

    return consulta
  }

  async getHasSubmodule(
    lang:string, 
    moduloId?: number
  ){
    
    let consulta = []

    consulta = await this.moduloRepository.createQueryBuilder("modulo")
    .where("modulo.id  = :moduloId", { moduloId: moduloId })
    .getMany();

    if(consulta.length == 0) throw new NotFoundException(
      this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE', { lang }) }
    )

    return consulta
  }

  async getPermisoModulo(
    lang:string, 
    permisoId?: number
  ){
    let consulta = []

    consulta = await this.moduloRepository.createQueryBuilder("modulo")
    .andWhere("modulo.id  = :permiso", { permiso: permisoId })
    .getRawOne();
    
    if(!consulta) throw new NotFoundException(
      this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE', { lang }) }
    )

    return consulta

  }

  async getPermisoModuloAsignacion(lang, modulo?: object){
    const cuentaAsignados = await this.asignacionRepository.count({
      where: {
        nombre: modulo['modulo_nombre'],
        permiso: modulo['modulo_permiso'],
        descripcion: modulo['modulo_descripcion'],
        modulo_padre_id: modulo['modulo_modulo_padre_id']
      }
    })
    return cuentaAsignados
  }

  async findPaginada(lang:string,padreId:number, paginationDto: PaginationDto){

    const { limit, page, field = 'id' , order = 'Asc' } = paginationDto
    
    if(!paginationDto.page && !paginationDto.limit) throw new NotFoundException(
      this.i18n.t('modulo.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang, args: { field: field } })
    )

    if(field == '') throw new NotFoundException(
      this.i18n.t('modulo.MSJ_ERROR_PARAMETRO_CAMPO_FILTRO_NO_ENVIADO', { lang, args: { field: field } })
    )
    if(!paginationDto.page) throw new NotFoundException(
      this.i18n.t('modulo.MSJ_ERROR_PARAMETRO_CAMPO_PAGE_NO_ENVIADO', { lang, args: { field: field } })
    )
    if(!paginationDto.limit) throw new NotFoundException(
      this.i18n.t('modulo.MSJ_ERROR_PARAMETRO_CAMPO_LIMIT_NO_ENVIADO', { lang, args: { field: field } })
    )

    if(field != ''){
      const propiedades = this.listarPropiedadesTabla(this.moduloRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(
        this.i18n.t('user.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field: field } })
      )
    }

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit
    const padreIdReal = (padreId == 0) ? IsNull() : padreId

    const peticion = async (page) => {
      return await this.moduloRepository.find({
        where: {
          modulo_padre_id: padreIdReal
        },
        skip: page,
        take: limit,
        order: {
          [field]: order
        }
      })
    }

    const totalRecords = async () => {
      return await this.moduloRepository.count({
        where: {
          modulo_padre_id: padreIdReal
        }
      })
    }

    return [{
      'result': await peticion(skipeReal),
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page == 1) ? null : page-1,
        'next': (await peticion(page*limit)).length == 0 ? null : page+1,
        'totalRecord': await totalRecords()
      },
      'order':{
        'order': order,
        'field': field
      }
    }]

  }

  // requieren permisos de usuario

  async create(
    lang:string, 
    createModuleDto: CreateModuloDto,
    userId: number
  ) {
    try {
      if(!createModuleDto.nombre) throw new NotFoundException(this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE', { lang }) })
      if(!createModuleDto.descripcion) throw new NotFoundException(this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE', { lang }) })
      if(!createModuleDto.permiso) throw new NotFoundException(this.i18n.t('modulo.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('modulo.MSJ_ERROR_PERMISO_NO_EXISTENTE', { lang }) })
      
      await this.findPermiso(createModuleDto.modulo_padre_id, createModuleDto.permiso, 'CREATE')

      let model = {
        'modulo_padre_id': (createModuleDto.modulo_padre_id == 0) ? null : createModuleDto.modulo_padre_id,
        'tiene_submodulos': createModuleDto.tiene_submodulos,
        'tiene_permisos': createModuleDto.tiene_permisos,
        'nombre': createModuleDto.nombre,
        'permiso': createModuleDto.permiso,
        'descripcion': createModuleDto.descripcion,
      }

      await this.moduloRepository.save(model);

      return {
        'title': this.i18n.t('modulo.MSJ_PERMISO_TITTLE', { lang }),
        'message': this.i18n.t('modulo.MSJ_PERMISO_CREADO_OK', { lang }),
        'status': 200,
      }
    } catch (error) {
      return {
        'title': error.response.message,
        'message': error.response.error,
        'status': 404,
      }
    }
  }

  async update(
    lang:string,
    query: any,
    userId: number
  ){

    let idRegistro = await this.findPermiso(query.idModulo, query.permiso, 'SEARCH')
    const elimiarModulo = this.moduloRepository.delete(idRegistro[0].id);
    
    return {
      'title': this.i18n.t('modulo.MSJ_PERMISO_TITTLE', { lang }),
      'message': this.i18n.t('modulo.MSN_PERMISO_REMOVIDO_OK', { lang }),
      'status': 200,
    }
    
  }  

  async remove(
    lang:string,
    idPermiso: number,
    userId: number
  ){
    try {
      const selectPermisoModulo = await this.moduloRepository.find({
        where: {
          id: idPermiso
        }
      });

      const nombrePermiso = await selectPermisoModulo[0].nombre
      const permiso = await selectPermisoModulo[0].permiso
      const padre_id = await selectPermisoModulo[0].modulo_padre_id

      const selectPermisosAsignados = await this.asignacionRepository.find({
        where: {
          nombre: nombrePermiso,
          permiso: permiso,
          modulo_padre_id: padre_id
        }
      })

      if(selectPermisosAsignados.length > 0){
        return {
          'title': this.i18n.t('modulo.MSJ_PERMISO_TITTLE', { lang }),
          'message': this.i18n.t('modulo.MSJ_ERROR_PERMISO_TIENE_IS_ASSIGNED', { lang }),
          'status': 404,
        }
      }

      const elimiarModulo = await this.moduloRepository.delete(+idPermiso);

      return {
        'title': this.i18n.t('modulo.MSJ_PERMISO_TITTLE', { lang }),
        'message': this.i18n.t('modulo.MSN_PERMISO_REMOVIDO_OK', { lang }),
        'status': 200,
      }
    } catch (error) {
      return {
        'title': this.i18n.t('modulo.MSJ_PERMISO_TITTLE', { lang }),
        'message': this.i18n.t('modulo.MSJ_ERROR_PERMISO_TIENE_PERMISOS_HIJOS', { lang }),
        'status': 404,
      }
    }
  }

  async updateModulePermiso(
    lang:string,
    query: any, 
    editModuloDto: EditModuloDto,
    userId: number
  ){
    // query.idPermiso sera el id de la tabla mod_permisos_modulo
    let modulo = await this.getPermisoModulo(lang, query.idPermiso)
    let asignacion = await this.getPermisoModuloAsignacion(lang, modulo)  

    // actualizar en mod_permisos_modulo
    const moduloPermiso = await this.moduloRepository.findOne({
      where: {
        id: query.idPermiso,
      }
    });
    const updateResult: UpdateResult = await this.moduloRepository.update(
        {
          // WHERE
          nombre: moduloPermiso.nombre,
          permiso: moduloPermiso.permiso,
          descripcion: moduloPermiso.descripcion
        },
        {
          // SET
          nombre: editModuloDto.nombre,
          permiso: editModuloDto.permiso,
          descripcion: editModuloDto.descripcion
        }
    );

    // actualizar en mod_permisos_modulo_asignacion
    if(asignacion > 0){
      const asignacion = await this.asignacionRepository.find({
        where: {
          nombre: moduloPermiso.nombre,
          permiso: moduloPermiso.permiso,
          descripcion: moduloPermiso.descripcion
        }
      });
      if(asignacion.length > 0){
        const updateResult: UpdateResult = await this.asignacionRepository.update(
          {
            // WHERE
            nombre: moduloPermiso.nombre,
            permiso: moduloPermiso.permiso,
            descripcion: moduloPermiso.descripcion
          },
          {
            //SET
            nombre: editModuloDto.nombre,
            permiso: editModuloDto.permiso,
            descripcion: editModuloDto.descripcion
          }
      );
      }
    }
    
  

    return {
      'title': this.i18n.t('modulo.MSJ_PERMISO_TITTLE', { lang }),
      'message': this.i18n.t('modulo.MSN_PERMISO_UPDATED_OK', { lang }),
      'status': 200,
    }
  }
}
