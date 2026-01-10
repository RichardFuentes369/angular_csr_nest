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
  findPaginada(
    @Query('lang') lang:string,
    @Param('padreId') padreId: string, 
    @Query() paginationDto: PaginationDto
  ) {
    return this.modulosService.findPaginada(
      lang,
      +padreId, 
      paginationDto
    );
  }

  @ApiTags('permisos_modulos')
  @Get('getPermisosPorUsuario')
  findAllForUser(
    @Query('lang') lang:string,
    @Query() query
  ) {
    return this.modulosService.findAllForUser(
      lang,
      query
    );
  }

  @ApiTags('permisos_modulos')
  @Get('getModuloPermisoExistente')
  findOne(
    @Query('lang') lang:string,
    @Query() query) {
    return this.modulosService.findPermiso(
      lang,
      +query.idModulo, 
      query.permiso, 
      'SEARCH'
    );
  }

  @ApiTags('permisos_modulos')
  @Get('getHasSubmodule')
  findSubmodules(
    @Query('lang') lang:string,
    @Query() query
  ) {
    return this.modulosService.getHasSubmodule(
      lang,
      +query.idModulo
    );
  }

  @ApiTags('permisos_modulos')
  @Post('postModuloPermiso')
  create(
    @Query('lang') lang:string,
    @Body() createModuloDto: CreateModuloDto
  ) {
    return this.modulosService.create(
      lang,
      createModuloDto
    );
  }

  @ApiTags('permisos_modulos')
  @Patch('editModuloPermiso')
  updateModuloPermiso(
    @Query('lang') lang:string,
    @Query() queryParams, @Body() editModuloDto: EditModuloDto
  ) {
    return this.modulosService.updateModulePermiso(
      lang,
      queryParams, 
      editModuloDto
    );
  }  
  
  @ApiTags('permisos_modulos')
  @Patch('updateModuloPermiso')
  update(
    @Query('lang') lang:string,
    @Query() queryParams
  ) {
    return this.modulosService.update(
      lang,
      queryParams
    );
  }

  @ApiTags('permisos_modulos')
  @Delete('deleteModuloPermiso')
  remove(
    @Query('lang') lang:string,
    @Query('idPermiso') idPermiso: string
  ) {
    return this.modulosService.remove(
      lang,
      +idPermiso
    );
  }
}
