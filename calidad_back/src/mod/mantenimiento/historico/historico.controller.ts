import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { CreateHistoricoDto } from './dto/create-historico.dto';
import { UpdateHistoricoDto } from './dto/update-historico.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@global/dto/pagination.dto';
import { OrdenService } from '../orden/orden.service';

@Controller('orden-historico')
export class HistoricoController {
  constructor(
    private readonly ordenService: OrdenService,
    private readonly historicoService: HistoricoService,
  ) {}

  @ApiTags('orden-historico')
  @Get(':idOrden')
  findAll(@Param('idOrden') idOrden: string, @Query() paginationDto: PaginationDto) {
    return this.historicoService.findAll(+idOrden, paginationDto);
  }

  @ApiTags('orden-historico')
  @Post(':idOrden')
  async create(@Param('idOrden') idOrden: string, @Body() createHistoricoDto: CreateHistoricoDto) {
    
    if(await this.ordenService.findOne(+idOrden) == null){
      throw new HttpException(
        `No existe la orden con nro # : ${createHistoricoDto.orden_id}`,
        HttpStatus.BAD_REQUEST, 
      );
    } 

    try {
      let almacenamientoHistorico = await this.historicoService.create(createHistoricoDto)
      await this.ordenService.actualizarPrecio(almacenamientoHistorico.orden_id, almacenamientoHistorico.precio, 1)
      return almacenamientoHistorico 
    } catch (error) {
      
    }

  }

  @ApiTags('orden-historico')
  @Delete(':idOrden')
  async remove(@Param('idOrden') id: string) {

    try {
      let historico = await this.historicoService.findOne(+id)
      await this.ordenService.actualizarPrecio(historico.orden_id, historico.precio, 0)
      return await this.historicoService.remove(+id)
    } catch (error) {
      
    }
  }

}
