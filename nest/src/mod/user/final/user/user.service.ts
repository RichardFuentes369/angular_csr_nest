import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { In, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { FilterUserDto } from '@module/user/dto/filter-user.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
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
      const propiedades = this.listarPropiedadesTabla(this.userRepository)
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
      return await this.userRepository.find({
        skip: page,
        take: limit,
        where: where,
        order: {
          [field]: order
        }
      })
    }

    const totalRecords = async () => {
      return await this.userRepository.count({
        where: where
      })
    }

    return [{
      'result': await peticion(skipeReal),
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

  findOne(
    id: number,
    lang: string,
  ) {
    return this.userRepository.findOne({
      where: [ {id : id}],
      order: { id: 'DESC' }
    });
  }

  async findUsernameEmail(username: string): Promise<User>{
    return this.userRepository.findOne({
      where: [ {email : username}]
    });
  }

  // requieren permisos de usuario

  async create(
  createUserDto: CreateUserDto,
  lang: string,
  userId: number
) {
    try{
      const encontrarCorreo = await this.findUsernameEmail(createUserDto.email)
  
      if(encontrarCorreo) throw new NotFoundException(`
        Este correo ${createUserDto.email}, ya esta registrado en nuestra base de datos
      `)
      await this.userRepository.save(createUserDto);

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
    id: number, 
    updateUserDto: UpdateUserDto,
    lang: string,
    userId: number
  ) {
    const property = await this.userRepository.findOne({
      where: { id }
    });

    if(updateUserDto.email){
      if(updateUserDto.email != property.email){
  
        let concidencia = await this.userRepository.findOne({
          where: [ {email : updateUserDto.email}]
        });
        
        if(concidencia) throw new NotFoundException(
          this.i18n.t('user.MSJ_ERROR_USER_EXIST', { lang, args: { correo: updateUserDto.email } })
        )
        
      }
    }
    
    return this.userRepository.save({
      ...property, // existing fields
      ...updateUserDto // updated fields
    });
  }

  updateStatus(
    id: number[], 
    isActiveo: boolean,
    lang: string,
    userId: number
  ) {
    return this.userRepository.update(
        { id: In(id) },
        { isActive: isActiveo } 
    );
  }  

  remove(
    id: number[],
    lang: string,
    userId: number
  ) {
    return this.userRepository.delete({id: In(id)})
  }
}
