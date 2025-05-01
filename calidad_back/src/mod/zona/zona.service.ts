import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';

import { Like, Repository } from 'typeorm';
import { Zona } from './entities/zona.entity';
import { PaginationDto } from '@global/dto/pagination.dto';
import { format } from 'date-fns';
import { FilterZonaDto } from './dto/filter-zona.dto';

@Injectable()
export class ZonaService {
  constructor(
    @Inject('ZONA_SOCIAL_REPOSITORY')
    private zonaRepository: Repository<Zona>,
  ) {}

  async create(createZonaDto: CreateZonaDto) {
    const encontrarZona = await this.findNombreZona(createZonaDto.nombre, createZonaDto.descripcion)

    if(encontrarZona) throw new NotFoundException(`
      La zona con nombre ${createZonaDto.nombre} y descripcion ${createZonaDto.descripcion}, ya se encuentra registrada en nuestra base de datos
    `)

    let modelo = {
      descripcion: createZonaDto.descripcion,
      nombre: createZonaDto.nombre,
      ubicacion: createZonaDto.ubicacion,
      fecha_creacion: Math.floor(Date.now() / 1000)
    }

    return this.zonaRepository.save(modelo);
  }
  
  listarPropiedadesTabla(T) {
    const metadata = T.metadata;
    return metadata.columns.map((column) => column.propertyName);
  }

  async findAll(filterZonaDto: FilterZonaDto) {

    const { limit, page, field = 'id' , order = 'Asc' } = filterZonaDto
    
    if(!filterZonaDto.page && !filterZonaDto.limit) throw new NotFoundException(`
      Recuerde que debe enviar los parametros page, limit
    `)

    if(field == '') throw new NotFoundException(`Debe enviar el campo por el que desea filtrar`)
    if(!filterZonaDto.page) throw new NotFoundException(`Debe enviar el parametro page`)
    if(!filterZonaDto.limit) throw new NotFoundException(`Debe enviar el parametro limit`)

    if(field != ''){
      const propiedades = this.listarPropiedadesTabla(this.zonaRepository)
      const arratResult = propiedades.filter(obj => obj === field).length
  
      if(arratResult == 0) throw new NotFoundException(`El parametro de busqueda ${field} no existe en la base de datos`)
    }
  
    const skipeReal = (page == 1) ? 0 : (page - 1) * limit

    const where: any = {};

    if (filterZonaDto.nombre !== undefined && filterZonaDto.nombre) {
      where.nombre = Like(`%${filterZonaDto.nombre}%`);
    }
    if (filterZonaDto.descripcion !== undefined && filterZonaDto.descripcion) {
      where.descripcion = Like(`%${filterZonaDto.descripcion}%`);
    }

    const peticion = async (page) => {
      return await this.zonaRepository.find({
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
      return await this.zonaRepository.count({
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
    return this.zonaRepository.findOne({
      where: [ {id : id}],
      order: { id: 'DESC' }
    });
  }

  async update(id: number, updateZonaDto: UpdateZonaDto) {
    const property = await this.zonaRepository.findOne({
      where: { id }
    });
   
    return this.zonaRepository.save({
      ...property, // existing fields
      ...updateZonaDto // updated fields
    });
  }

  remove(id: number) {
    return this.zonaRepository.delete(id);
  }

  async findNombreZona(nombreZona: string, descripcionZona: string): Promise<Zona>{
    return this.zonaRepository.findOne({  
      where: {
        nombre : nombreZona,
        descripcion : descripcionZona
      }
    });
  }

  async findSelectZona(){
    return this.zonaRepository.find({
      select: ['id', 'nombre', 'descripcion'],
    });
  }

}
