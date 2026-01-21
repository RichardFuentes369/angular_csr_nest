import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { In, Like, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { FilterUserDto } from '@module/user/dto/filter-user.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private adminRepository: Repository<Admin>,
    private i18n: I18nService
  ) {}

  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(
    filterUserDto: FilterUserDto,
    lang: string
  ) {

    const { limit, page, field = 'id' , order = 'Asc' } = filterUserDto
    
    if(!filterUserDto.page && !filterUserDto.limit) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_LISTA_NO_ENVIADO', { lang, args: { field: field } })
    )

    if(field == '') throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_FILTRO_NO_ENVIADO', { lang, args: { field: field } })
    )
    if(!filterUserDto.page) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_PAGE_NO_ENVIADO', { lang, args: { field: field } })
    )
    if(!filterUserDto.limit) throw new NotFoundException(
      this.i18n.t('user.MSJ_ERROR_PARAMETRO_CAMPO_LIMIT_NO_ENVIADO', { lang, args: { field: field } })
    )

    if(field != ''){
      const propiedades = this.listarPropiedadesTabla(this.adminRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(
        this.i18n.t('user.MSJ_ERROR_PARAMETRO_NO_EXISTE', { lang, args: { field: field } })
      )
    }

    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const where: any = {};

    if (filterUserDto.email !== undefined && filterUserDto.email) {
      where.email = Like(`%${filterUserDto.email}%`);
    }
    if (filterUserDto.firstName !== undefined && filterUserDto.firstName) {
      where.firstName = Like(`%${filterUserDto.firstName}%`);
    }
    if (filterUserDto.lastName !== undefined && filterUserDto.lastName) {
      where.lastName = Like(`%${filterUserDto.lastName}%`);
    }
    if (filterUserDto.isActive !== undefined && filterUserDto.isActive === 0 || filterUserDto.isActive === 1) {
      where.isActive = filterUserDto.isActive;
    }

    const peticion = async (page) => {
      return await this.adminRepository.find({
        skip: page,
        take: limit,
        where: where,
        order: {
          [field]: order
        }
      })
    }

    const totalRecords = async () => {
      return await this.adminRepository.count({
        where: where
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

  findOne(
    lang: string,
    id: number
  ) {
    return this.adminRepository.findOne({
      where: [ {id : id}],
      order: { id: 'DESC' }
    });
  }

  async findUsernameEmail(
    username: string
  ): Promise<Admin>{
    return this.adminRepository.findOne({
      where: [ {email : username}]
    });
  }

  // requieren permisos de usuario

  async create(
    lang: string,
    createAdminDto: CreateAdminDto,
    userId: number
  ) {
    try {

      const encontrarCorreo = await this.findUsernameEmail(createAdminDto.email)

      if(encontrarCorreo) throw new NotFoundException(
        this.i18n.t('user.MSJ_ERROR_USER_EXIST', { lang, args: { correo: createAdminDto.email } })
      )      
  
      this.adminRepository.save(createAdminDto);
      return {
        'title': this.i18n.t('user.MSJ_USUARIO_TITTLE', { lang }),
        'message': this.i18n.t('user.MSJ_USUARIO_CREADO_EXITOSAMENTE_TITTLE', { lang }),
        'status': 200,
      }

    } catch (error) {
      return {
        'title': error.response.error,
        'text': error.response.error,
        'message': error.response.message,
        'status': 404,
      }
    }
  }

  async update(
    lang: string, 
    id: number, 
    updateAdminDto: UpdateAdminDto,
    userId: number
  ) {
    const property = await this.adminRepository.findOne({
      where: { id }
    });

    if(updateAdminDto.email){
      if(updateAdminDto.email != property.email){
  
        let concidencia = await this.adminRepository.findOne({
          where: [ {email : updateAdminDto.email}]
        });
        
        if(concidencia) throw new NotFoundException(
          this.i18n.t('user.MSJ_ERROR_USER_EXIST', { lang, args: { correo: updateAdminDto.email } })
        )
        
      }
    }

    return this.adminRepository.save({
      ...property, // existing fields
      ...updateAdminDto // updated fields
    });
  }

  updateStatus(
    lang: string, 
    id: number[], 
    isActiveo: boolean,
    userId: number
  ) {
    return this.adminRepository.update(
        { id: In(id) },
        { isActive: isActiveo } 
    );
  }  
  
  remove(
    lang: string,
    id: number[],
    userId: number
  ) {
    return this.adminRepository.delete({id: In(id)})
  }
}
