import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ModulosService } from './modulos.service'
import { CreateModuloDto } from './dto/create-modulo.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '@global/dto/pagination.dto';
import { EditModuloDto } from './dto/edit-modulo.dto';
import { AdminGuard } from '@guard/admin/admin.guard';
import { GetUser } from 'src/decorator/getIdUser.decorator';

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}
    
  @ApiTags('modulo_submodulo_permiso')
  @Get('obtener-permisos-por-modulo/:padreId')
  findPaginada(
    @Query('lang') lang:string,
    @Param('padreId') padreId: string, 
    @Query() paginationDto: PaginationDto,
    @GetUser('id') userId: number
  ) {
    return this.modulosService.findPaginada(
      lang,
      +padreId, 
      paginationDto
    );
  }
 
  // no se usa
  @ApiTags('modulo_submodulo_permiso')
  @UseGuards(AdminGuard)
  @Get('getModuloPermisoExistente')
  findOne(
    @Query('lang') lang:string,
    @Query() query,
    @GetUser('id') userId: number
  ) {
    return this.modulosService.findPermiso(
      lang,
      +query.idModulo, 
      query.permiso, 
      'SEARCH'
    );
  }

  @ApiTags('modulo_submodulo_permiso')
  @UseGuards(AdminGuard)
  @Get('obtener-modulo-permiso')
  findSubmodules(
    @Query('lang') lang:string,
    @Query() query,
    @GetUser('id') userId: number
  ) {
    return this.modulosService.getHasSubmodule(
      lang,
      +query.idModulo
    );
  }

  @ApiTags('modulo_submodulo_permiso')
  @UseGuards(AdminGuard)
  @Post('crear-modulo-permiso')
  create(
    @Query('lang') lang:string,
    @Body() createModuloDto: CreateModuloDto,
    @GetUser('id') userId: number
  ) {
    return this.modulosService.create(
      lang,
      createModuloDto,
      userId
    );
  }

  @ApiTags('modulo_submodulo_permiso')
  @UseGuards(AdminGuard)
  @Patch('editar-modulo-permiso')
  updateModuloPermiso(
    @Query('lang') lang:string,
    @Query() queryParams, @Body() editModuloDto: EditModuloDto,
    @GetUser('id') userId: number
  ) {
    return this.modulosService.updateModulePermiso(
      lang,
      queryParams, 
      editModuloDto,
      userId
    );
  }  

  // no se usa
  @ApiTags('modulo_submodulo_permiso')
  @UseGuards(AdminGuard)
  @Patch('updateModuloPermiso')
  update(
    @Query('lang') lang:string,
    @Query() queryParams,
    @GetUser('id') userId: number
  ) {
    return this.modulosService.update(
      lang,
      queryParams,
      userId
    );
  }

  @ApiTags('modulo_submodulo_permiso')
  @UseGuards(AdminGuard)
  @Delete('eliminar-modulo-permiso')
  remove(
    @Query('lang') lang:string,
    @Query('idPermiso') idPermiso: string,
    @GetUser('id') userId: number
  ) {
    return this.modulosService.remove(
      lang,
      +idPermiso,
      userId
    );
  }
}
