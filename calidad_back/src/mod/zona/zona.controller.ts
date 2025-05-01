import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ZonaService } from './zona.service';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';


import { PaginationDto } from '@global/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterZonaDto } from './dto/filter-zona.dto';

@Controller('zona')
export class ZonaController {
  constructor(private readonly zonaService: ZonaService) {}

    @ApiTags('zonaSocial')
    @Post('crear-zona')
    create(@Body() createZonaDto: CreateZonaDto) {
      return this.zonaService.create(createZonaDto);
    }

    @ApiTags('zonaSocial')
    @Get()
    findAll(@Query() filterZonaDto: FilterZonaDto) {
      return this.zonaService.findAll(filterZonaDto);
    }    
    
    @ApiTags('zonaSocial')
    @Get('zonaSelect')
    zonaSelect() {
      return this.zonaService.findSelectZona();
    }
    
    @ApiTags('zonaSocial')
    @Get('obtener-zona/:id')
    findOne(@Param('id') id: string) {
      return this.zonaService.findOne(+id);
    }

    @ApiTags('zonaSocial')
    @Patch('editar-zona/:id')
    update(@Param('id') id: string, @Body() updateZonaDto: UpdateZonaDto) {
      return this.zonaService.update(+id, updateZonaDto);
    }
    
    @ApiTags('zonaSocial')
    @Delete('eliminar-zona/:id')
    remove(@Param('id') id: string) {
      return this.zonaService.remove(+id);
    }
  
}
