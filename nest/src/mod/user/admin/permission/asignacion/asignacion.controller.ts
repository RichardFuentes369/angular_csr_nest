import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@guard/admin/admin.guard';
import { GetUser } from 'src/decorator/getIdUser.decorator';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @ApiTags('asignacion_permiso')
  @UseGuards(AdminGuard)
  @Get('mis-permisos')
  findAll(
    @Query('lang') lang:string,
    @Query() query,
    @GetUser('id') userId: number
  ) {
    if(query.heredadosDe){
      return this.asignacionService.findAll(
        lang,
        +query.idUser, 
        query.heredadosDe
      );
    }
    return this.asignacionService.findAll(
      lang,
      +query.idUser, 
      ''
    );
  }

  @UseGuards(AdminGuard)
  @Get('obtener-permisos-por-usuario')
  findAllForUser(
    @Query('lang') lang:string,
    @Query() query,
    @GetUser('id') userId: number
  ) {
    return this.asignacionService.findAllForUser(
      lang,
      query
    );
  }

  @ApiTags('asignacion_permiso')
  @UseGuards(AdminGuard)
  @Get('validar-acceso-permiso-usuario')
  findOne(
    @Query('lang') lang:string,
    @Query() query,
    @GetUser('id') userId: number
  ) {
    return this.asignacionService.findOne(
      lang,
      +query.idModulo, 
      query.nombre, 
      +query.idUser,
    );
  }

  @ApiTags('asignacion_permiso')
  @UseGuards(AdminGuard)
  @Put('actualizar-asignacion-permiso')
  updateAsignacion(
    @Query('lang') lang:string,
    @Query() query,
    @GetUser('id') userId: number
  ) {
    return this.asignacionService.updateAsignacion(
      lang,
      +query.idPermiso, 
      query.idPadre, 
      +query.opcion, 
      +query.idUser
    );
  }
}

