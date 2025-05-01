import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

import { Like, Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { format } from 'date-fns';
import { FilterProveedorDto } from './dto/filter-proveedor.dto';
import { proveedorStatus } from './entities/enums/proveedorStatus';

@Injectable()
export class ProveedorService {
   constructor(
     @Inject('PROVEEDOR_REPOSITORY')
     private proveedorRepository: Repository<Proveedor>,
   ) {}

  async create(createProveedorDto: CreateProveedorDto) {
    const encontroProveedor = await this.findProveedor(createProveedorDto.nit)

    if(encontroProveedor) throw new NotFoundException(`
      El proveedor con nit ${createProveedorDto.nit}, ya esta registrado en nuestra base de datos
    `)

    let modelo = {
      email: createProveedorDto.email,
      estado: createProveedorDto.estado,
      nit: createProveedorDto.nit,
      razonSocial: createProveedorDto.razonSocial,
      telefono: createProveedorDto.telefono,
      fecha_creacion: Math.floor(Date.now() / 1000)
    }

    return this.proveedorRepository.save(modelo);
  }
 
  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterProveedorDto: FilterProveedorDto) {

    const { limit, page, field = 'id' , order = 'Asc' } = filterProveedorDto
    
    if(!filterProveedorDto.page && !filterProveedorDto.limit) throw new NotFoundException(`
      Recuerde que debe enviar los parametros page, limit
    `)

    if(field == '') throw new NotFoundException(`Debe enviar el campo por el que desea filtrar`)
    if(!filterProveedorDto.page) throw new NotFoundException(`Debe enviar el parametro page`)
    if(!filterProveedorDto.limit) throw new NotFoundException(`Debe enviar el parametro limit`)

    if(field != ''){
      const propiedades = this.listarPropiedadesTabla(this.proveedorRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }
  
    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const where: any = {};

    if (filterProveedorDto.isActive !== undefined && filterProveedorDto.isActive) {
      where.isActive = Like(`%${filterProveedorDto.isActive}%`);
    }

    if (filterProveedorDto.razonSocial !== undefined && filterProveedorDto.razonSocial) {
      where.razonSocial = Like(`%${filterProveedorDto.razonSocial}%`);
    }

    if (filterProveedorDto.telefono !== undefined && filterProveedorDto.telefono) {
      where.telefono = Like(`%${filterProveedorDto.telefono}%`);
    }

    if (filterProveedorDto.estado !== undefined && filterProveedorDto.estado) {
      where.estado = Like(`%${filterProveedorDto.estado}%`);
    }    
    
    if (filterProveedorDto.nit !== undefined && filterProveedorDto.nit) {
      where.nit = Like(`%${filterProveedorDto.nit}%`);
    }

    const peticion = async (page) => {
      return await this.proveedorRepository.find({
        skip: page,
        take: limit,
        where: where,
        order: {
          [field]: order
        }
      })
    }

    const dataReal = await peticion(skipeReal)

    const fechaParseada =  dataReal.map((data) => ({
      ...data,
      fecha_creacion: data.fecha_creacion ? format(new Date(data.fecha_creacion * 1000), 'yyyy-MM-dd HH:mm:ss') : null,
      fecha_actualizacion: data.fecha_actualizacion ? format(new Date(data.fecha_actualizacion * 1000), 'yyyy-MM-dd HH:mm:ss') : null,
    }));
   

    const totalRecords = async () => {
      return await this.proveedorRepository.count({
        where: where
      })
    }

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

  findOne(id: number) {
    return this.proveedorRepository.findOne({
      where: [ {id : id}],
      order: { id: 'DESC' }
    });
  }

  async update(id: number, updateProveedorDto: UpdateProveedorDto) {
    const property = await this.proveedorRepository.findOne({
      where: { id }
    });

    if(updateProveedorDto.email){
      if(updateProveedorDto.email != property.email){
  
        let concidencia = await this.proveedorRepository.findOne({
          where: [ {email : updateProveedorDto.email}]
        });
        
        if(concidencia) throw new NotFoundException(`
          El correo que esta intentando actualizar ya existe
        `)
        
      }
    }
    
    return this.proveedorRepository.save({
      ...property, // existing fields
      ...updateProveedorDto // updated fields
    });
  }

  remove(id: number) {
    return this.proveedorRepository.delete(id);
  }

  async findProveedor(nit: string): Promise<Proveedor>{
    return this.proveedorRepository.findOne({
      where: [{nit : nit}]
    });
  }

  async findSelectProveedor(){
    return this.proveedorRepository.find({
      select: ['id', 'razonSocial'],
      where: [
        { 'estado': proveedorStatus.Activo }
      ]
    });
  }
}
