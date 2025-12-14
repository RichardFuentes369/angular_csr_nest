import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ModulosService } from './modulos.service'
import { CreateModuloDto } from './dto/create-modulo.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@global/dto/pagination.dto';
import { EditModuloDto } from './dto/edit-modulo.dto';

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}
    
  @ApiTags('permisos_modulos')
  @Get('getPermisosSobrePadre/:padreId')
  findPaginada(@Param('padreId') padreId: string, @Query() paginationDto: PaginationDto) {
    return this.modulosService.findPaginada(+padreId, paginationDto);
  }

  @ApiTags('permisos_modulos')
  @Get('getPermisosPorUsuario')
  findAllForUser(@Query() query) {
    return this.modulosService.findAllForUser(query);
  }

  @ApiTags('permisos_modulos')
  @Get('getModuloPermisoExistente')
  findOne(@Query() query) {
    return this.modulosService.findPermiso(+query.idModulo, query.permiso, 'SEARCH');
  }

  @ApiTags('permisos_modulos')
  @Get('getHasSubmodule')
  findSubmodules(@Query() query) {
    return this.modulosService.getHasSubmodule(+query.idModulo);
  }

  @ApiTags('permisos_modulos')
  @Post('postModuloPermiso')
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.modulosService.create(createModuloDto);
  }

  @ApiTags('permisos_modulos')
  @Patch('editModuloPermiso')
  updateModuloPermiso(@Query() queryParams, @Body() editModuloDto: EditModuloDto) {
    return this.modulosService.updateModulePermiso(queryParams, editModuloDto);
  }  
  
  @ApiTags('permisos_modulos')
  @Patch('updateModuloPermiso')
  update(@Query() queryParams) {
    return this.modulosService.update(queryParams);
  }

  @ApiTags('permisos_modulos')
  @Delete('deleteModuloPermiso')
  remove(@Query('idPermiso') idPermiso: string) {
    return this.modulosService.remove(+idPermiso);
  }
}
