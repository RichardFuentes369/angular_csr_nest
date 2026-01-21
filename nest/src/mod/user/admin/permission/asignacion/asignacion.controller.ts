import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { AsignacionService } from './asignacion.service';
import { CreateAsignacionDto } from './dto/create-asignacion.dto';
import { UpdateAsignacionDto } from './dto/update-asignacion.dto';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '@guard/admin/admin.guard';

@Controller('asignacion')
export class AsignacionController {
  constructor(private readonly asignacionService: AsignacionService) {}

  @ApiTags('asignacion_permiso')
  @UseGuards(AdminGuard)
  @Get('mis-permisos')
  findAll(
    @Query('lang') lang:string,
    @Query() query
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

  @ApiTags('asignacion_permiso')
  @UseGuards(AdminGuard)
  @Get('getAsignacionMePertenece')
  findOne(
    @Query('lang') lang:string,
    @Query() query
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
  @Put('updateAsignacionPermiso')
  updateAsignacion(
    @Query('lang') lang:string,
    @Query() query
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

