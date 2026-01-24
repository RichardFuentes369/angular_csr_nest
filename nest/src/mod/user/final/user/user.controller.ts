import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ApiTags } from '@nestjs/swagger';

import { FilterUserDto } from '@module/user/dto/filter-user.dto';
import { UpdateStatusDto } from '@module/user/admin/user/dto/update-status.dto';
import { AdminGuard } from '@guard/admin/admin.guard';
import { GetUser } from 'src/decorator/getIdUser.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
  @ApiTags('user')
  // @UseGuards(AdminGuard)
  @Get('obtener-usuarios-finales')
  findAll(
    @Query('lang') lang:string,
    @Query() filterUserDto: FilterUserDto,
    @GetUser('id') userId: number
  ) {
    return this.userService.findAll(
      filterUserDto,
      lang
    );
  }
  
  @ApiTags('user')
  @UseGuards(AdminGuard)
  @Get('obtener-usuario-final')
  findOne(
    @Query('_id') _id: string,
    @GetUser('id') userId: number,
    @Query('lang') lang:string
  ) {
    return this.userService.findOne(
      +_id,
      lang
    );
  }

  @ApiTags('user')
  @UseGuards(AdminGuard)
  @Post('crear-usuario-final')
  create(
    @Query('lang') lang:string,
    @Body() createUserDto: CreateUserDto,
    @GetUser('id') userId: number
  ) {
    return this.userService.create(
      createUserDto,
      lang,
      userId
    );
  }
  
  @ApiTags('user')
  @UseGuards(AdminGuard)
  @Patch('actualizar-usuario-final')
  update(
    @Query('lang') lang:string,
    @Query('_id') _id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser('id') userId: number
  ) {
    return this.userService.update(
      +_id, 
      updateUserDto,
      lang,
      userId
    );
  }

  @ApiTags('admin')
  @UseGuards(AdminGuard)
  @Patch('actualizar-estado-usuario-final')
  updateStatus(
    @Query('lang') lang:string,
    @Body() upsateStatus: UpdateStatusDto,
    @GetUser('id') userId: number
  ) {
    const option = (upsateStatus.option == '1') ? true : false
    return this.userService.updateStatus(
      upsateStatus.id, 
      option,
      lang,
      userId
    );
  }
  
  @ApiTags('user')
  @UseGuards(AdminGuard)
  @Delete('eliminar-usuario-final')
  remove(
    @Query('_id') _id: string,
    @Query('lang') lang:string,
    @GetUser('id') userId: number
  ) {
    const idsNumeros: number[] = _id.split(',').map(str => parseInt(str.trim(), 10));
    return this.userService.remove(
      idsNumeros,
      lang,
      userId
    );
  }
}
