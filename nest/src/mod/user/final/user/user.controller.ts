import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ApiTags } from '@nestjs/swagger';

import { FilterUserDto } from '@module/user/dto/filter-user.dto';
import { UpdateStatusDto } from '@module/user/admin/user/dto/update-status.dto';
import { AdminGuard } from '@guard/admin/admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('user')
  @UseGuards(AdminGuard)
  @Post('crear-usuario')
  create(
    @Query('lang') lang:string,
    @Body() createUserDto: CreateUserDto
  ) {
    return this.userService.create(
      createUserDto,
      lang
    );
  }
  
  @ApiTags('user')
  // @UseGuards(AdminGuard)
  @Get()
  findAll(
    @Query('lang') lang:string,
    @Query() filterUserDto: FilterUserDto
  ) {
    return this.userService.findAll(
      filterUserDto,
      lang
    );
  }
  
  @ApiTags('user')
  @UseGuards(AdminGuard)
  @Get('obtener-usuario/:id')
  findOne(
    @Query('lang') lang:string,
    @Param('id') id: string
  ) {
    return this.userService.findOne(
      +id,
      lang
    );
  }
  
  @ApiTags('user')
  @UseGuards(AdminGuard)
  @Patch('editar-usuario/:id')
  update(
    @Query('lang') lang:string,
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(
      +id, 
      updateUserDto,
      lang
    );
  }

  @ApiTags('admin')
  @UseGuards(AdminGuard)
  @Patch('actualizar-estado-admininistrador')
  updateStatus(
    @Query('lang') lang:string,
    @Body() upsateStatus: UpdateStatusDto
  ) {
    const option = (upsateStatus.option == '1') ? true : false
    return this.userService.updateStatus(
      upsateStatus.id, 
      option,
      lang
    );
  }
  
  @ApiTags('user')
  @UseGuards(AdminGuard)
  @Delete('eliminar-usuario/:id')
  remove(
    @Query('lang') lang:string,
    @Param('id') id: string
  ) {
    const idsNumeros: number[] = id.split(',').map(str => parseInt(str.trim(), 10));
    return this.userService.remove(
      idsNumeros,
      lang
    );
  }
}
