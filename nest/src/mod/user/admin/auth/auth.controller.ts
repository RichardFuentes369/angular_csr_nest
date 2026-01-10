import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { AdminGuard } from '@guard/admin/admin.guard';
import { AuthadminService } from './auth.service';
import { CreateAuthadminDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';
import { UpdateAuthadminDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('authadmin')
export class AuthadminController {
  constructor(private readonly authadminService: AuthadminService) {}

  @ApiTags('autenticacion_admin')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(
    @Query('lang') lang: string, 
    @Body() createAuthDto: CreateAuthadminDto
  ) {
    return this.authadminService.signIn(
      lang,
      createAuthDto
    );
  }
  
  @ApiTags('autenticacion_admin')
  @Post('refresh')
  refreshToken(
    @Query('lang') lang: string,
    @Body() token: TokenDto
  ) {
    return this.authadminService.refreshToken(
      lang,
      token
    );
  }
  
  @ApiTags('autenticacion_admin')
  @UseGuards(AdminGuard)
  @Get('profile')
  getProfile(
    @Request() req
  ) {
    return req.user;
  }
}


