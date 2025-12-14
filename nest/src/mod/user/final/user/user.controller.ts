import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PaginationDto } from '@global/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

import { FinalGuard } from '@guard/final/final.guard';
import { FilterUserDto } from '@module/user/dto/filter-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('user')
  @Post('crear-usuario')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @ApiTags('user')
  @Get()
  findAll(@Query() filterUserDto: FilterUserDto) {
    return this.userService.findAll(filterUserDto);
  }
  
  @ApiTags('user')
  @Get('obtener-usuario/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  
  @ApiTags('user')
  @Patch('editar-usuario/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  
  @ApiTags('user')
  @Delete('eliminar-usuario/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
