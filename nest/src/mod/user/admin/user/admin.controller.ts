import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { FilterUserDto } from '@module/user/dto/filter-user.dto';

import { ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AdminGuard } from '@guard/admin/admin.guard';
import { GetUser } from 'src/decorator/getIdUser.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
 
  @ApiTags('admin')
  // @UseGuards(AdminGuard)
  @Get('obtener-usuarios-administradores')
  findAll(
    @Query('lang') lang:string,
    @Query() filterUserDto: FilterUserDto,
    @GetUser('id') userId: number
  ) {
    return this.adminService.findAll(
      filterUserDto,
      lang
    );
  }

  @ApiTags('admin')
  @UseGuards(AdminGuard)
  @Get('obtener-usuario-administrador')
  findOne(
    @Query('_id') _id: string,
    @Query('lang') lang:string,
    @GetUser('id') userId: number
  ) {
    return this.adminService.findOne(
      lang,
      +_id
    );
  }

  @ApiTags('admin')
  @UseGuards(AdminGuard)
  @Post('crear-usuario-admininistrador')
  create(
    @Query('lang') lang:string,
    @Body() createAdminDto: CreateAdminDto,
    @GetUser('id') userId: number
  ) {
    return this.adminService.create(
      lang,
      createAdminDto,
      userId
    );
  }

  @ApiTags('admin')
  @UseGuards(AdminGuard)
  @Patch('editar-usuario-administrador')
  update(
    @Query('lang') lang:string,
    @Query('_id') _id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @GetUser('id') userId: number
  ) {
    return this.adminService.update(
      lang,
      +_id, 
      updateAdminDto,
      userId
    );
  }

  @ApiTags('admin')
  @UseGuards(AdminGuard)
  @Patch('actualizar-estado-admininistrador')
  updateStatus(
    @Query('lang') lang:string,
    @Body() upsateStatus: UpdateStatusDto,
    @GetUser('id') userId: number
  ) {
    const option = (upsateStatus.option == '1') ? true : false
    return this.adminService.updateStatus(
      lang,
      upsateStatus.id, 
      option, 
      userId
    );
  }

  @ApiTags('admin')
  @UseGuards(AdminGuard)
  @Delete('eliminar-usuario-admininistrador')
  remove(
    @Query('lang') lang:string,
    @Query('_id') _id: string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.adminService.remove(
      lang,
      idsNumeros,
      userId
    );
  }
}
