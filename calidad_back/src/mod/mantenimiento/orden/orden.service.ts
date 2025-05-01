import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

import { Between, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { FilterOrdenDto } from './dto/filter-orden.dto';
import { format } from 'date-fns';

@Injectable()
export class OrdenService {
  constructor(
      @Inject('ORDEN_REPOSITORY')
      private ordenRepository: Repository<Orden>,
  ) {}

  async create(createOrdenDto: CreateOrdenDto) {

    let modelo = {
      descripcion: createOrdenDto.descripcion,
      serial: `Ord - ${Math.floor(Date.now() / 1000)}`,
      fecha_creacion: Math.floor(Date.now() / 1000),
      fecha_mantenimiento: createOrdenDto.fecha_mantenimiento,
      zona_id: createOrdenDto.zona_id
    }

    return this.ordenRepository.save(modelo);
  }
  
  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterOrdenDto: FilterOrdenDto) {

    const { limit, page, field = 'id' , order = 'Asc' } = filterOrdenDto
    
    if(!filterOrdenDto.page && !filterOrdenDto.limit) throw new NotFoundException(`
      Recuerde que debe enviar los parametros page, limit
    `)

    if(field == '') throw new NotFoundException(`Debe enviar el campo por el que desea filtrar`)
    if(!filterOrdenDto.page) throw new NotFoundException(`Debe enviar el parametro page`)
    if(!filterOrdenDto.limit) throw new NotFoundException(`Debe enviar el parametro limit`)

    if(field != ''){
      const propiedades = this.listarPropiedadesTabla(this.ordenRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }
    
    const skipeReal = (page == 1) ? 0 : (page - 1) * limit
    
    const where: any = {};

    if (filterOrdenDto.serial !== undefined && filterOrdenDto.serial != '') {
      where.serial = Like(`%${filterOrdenDto.serial}%`);
    }
    if (filterOrdenDto.descripcion !== undefined && filterOrdenDto.descripcion != '') {
      where.descripcion = Like(`%${filterOrdenDto.descripcion}%`);
    }
    if (filterOrdenDto.precio !== undefined && filterOrdenDto.precio != '') {
      where.precio = Like(`%${filterOrdenDto.precio}%`);
    }   
    if (filterOrdenDto.estado !== undefined && filterOrdenDto.estado != '') {
      where.estado = Like(`%${filterOrdenDto.estado}%`);
    }
    if (filterOrdenDto.zona_id !== undefined && filterOrdenDto.zona_id != '') {
      where.zona_id = Like(`%${filterOrdenDto.zona_id}%`);
    }
    if(
      (
        filterOrdenDto.fecha_mantenimiento_inicio !== undefined && filterOrdenDto.fecha_mantenimiento_inicio != ''
      ) 
      || 
      (
        filterOrdenDto.fecha_mantenimiento_fin !== undefined && filterOrdenDto.fecha_mantenimiento_fin != ''
      )
    ){
      if(filterOrdenDto.fecha_mantenimiento_inicio != '' && filterOrdenDto.fecha_mantenimiento_fin != ''){
        let fecha_final = parseInt(filterOrdenDto.fecha_mantenimiento_fin) + 86399
        where.fecha_mantenimiento = Between(filterOrdenDto.fecha_mantenimiento_inicio, fecha_final.toString());
      }
      if(filterOrdenDto.fecha_mantenimiento_inicio != '' && filterOrdenDto.fecha_mantenimiento_fin == undefined){
          where.fecha_mantenimiento = MoreThanOrEqual(filterOrdenDto.fecha_mantenimiento_inicio);
      }
      if(filterOrdenDto.fecha_mantenimiento_inicio == undefined && filterOrdenDto.fecha_mantenimiento_fin != ''){
        let fecha_final = parseInt(filterOrdenDto.fecha_mantenimiento_fin) + 86399
        where.fecha_mantenimiento = LessThanOrEqual(fecha_final);
      }
    }
    if (filterOrdenDto.fecha_creacion !== undefined && filterOrdenDto.fecha_creacion != '') {
      let fecha_inicio = filterOrdenDto.fecha_creacion
      let fecha_final = parseInt(filterOrdenDto.fecha_creacion) + 86399
      where.fecha_creacion = Between(fecha_inicio, fecha_final.toString());
    }

    const peticion = async (page) => {
      return await this.ordenRepository.find({
        skip: page,
        take: limit,
        where: where, 
        order: {
          [field]: order
        },
        relations: ['zona_id']
      })
    }

    const totalRecords = async () => {
      return await this.ordenRepository.count({
        where: where
      })
    }

    const dataReal = await peticion(skipeReal)

    const fechaParseada =  dataReal.map((data) => ({
      ...data,
      fecha_creacion: data.fecha_creacion ? format(new Date(data.fecha_creacion * 1000), 'yyyy-MM-dd HH:mm:ss') : null,
      fecha_mantenimiento: data.fecha_mantenimiento ? format(new Date(data.fecha_mantenimiento * 1000), 'yyyy-MM-dd HH:mm:ss') : null,
      fecha_actualizacion: data.fecha_actualizacion ? format(new Date(data.fecha_actualizacion * 1000), 'yyyy-MM-dd HH:mm:ss') : null,
    }));

    return [{
      'result': fechaParseada,
      'pagination': {
        'page': page,
        'perPage': limit,
        'previou': (page == 1) ? null : page-1,
        'next': (await peticion(page*limit)).length == 0 ? null : page+1 ,
        'totalRecord': await totalRecords()
      },
      'order':{
        'order': order,
        'field': field
      }
    }]
  }

  findOne(_id: number) {
    return this.ordenRepository.findOne({
      where: [ { id: _id }],
      order: { id: 'DESC' },
      relations: ['zona_id']
    });
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto) {
    const property = await this.ordenRepository.findOne({
      where: { id }
    });

    return this.ordenRepository.save({
      ...property, // existing fields
      ...updateOrdenDto // updated fields
    });
  }

  async actualizarPrecio(id: number, precio: number, opcion: number){

    const orden = await this.ordenRepository.findOneBy({ id: id });

    if (orden && opcion == 1) {
      orden.precio += precio
    }else{
      orden.precio -= precio
    }
    
    return this.ordenRepository.save(orden)

  }

  remove(id: number) {
    return this.ordenRepository.delete(id);
  }


}
