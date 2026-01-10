import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

import { FilterUserDto } from '@module/user/dto/filter-user.dto';

import { ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AdminGuard } from '@guard/admin/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiTags('admin')
  @Post('crear-admininistrador')
  create(
    @Query('lang') lang:string,
    @Body() createAdminDto: CreateAdminDto
  ) {
    return this.adminService.create(
      lang,
      createAdminDto
    );
  }
  
  @ApiTags('admin')
  @Get()
  // @UseGuards(AdminGuard)
  findAll(
    @Query('lang') lang:string,
    @Query() filterUserDto: FilterUserDto
  ) {
    return this.adminService.findAll(
      filterUserDto,
      lang
    );
  }

  @ApiTags('admin')
  @Get('obtener-administrador/:id')
  findOne(
    @Query('lang') lang:string,
    @Param('id') id: string
  ) {
    return this.adminService.findOne(
      lang,
      +id
    );
  }

  @ApiTags('admin')
  @Patch('editar-administrador/:id')
  update(
    @Query('lang') lang:string,
    @Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(
      lang,
      +id, 
      updateAdminDto
    );
  }

  @ApiTags('admin')
  @Patch('actualizar-estado-admininistrador')
  updateStatus(
    @Query('lang') lang:string,
    @Body() upsateStatus: UpdateStatusDto
  ) {
    const option = (upsateStatus.option == '1') ? true : false
    return this.adminService.updateStatus(lang,upsateStatus.id, option);
  }

  @ApiTags('admin')
  @Delete('eliminar-admininistrador/:id')
  remove(
    @Query('lang') lang:string,
    @Param('id') id: string
  ) {
    const idsNumeros: number[] = id.split(',').map(str => parseInt(str.trim(), 10));
    return this.adminService.remove(lang,idsNumeros);
  }
}
