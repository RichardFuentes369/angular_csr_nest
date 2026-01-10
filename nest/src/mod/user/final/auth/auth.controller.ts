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
import { FinalGuard } from '@guard/final/final.guard';
import { AuthuserService } from './auth.service';
import { CreateAuthuserDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';
import { UpdateAuthuserDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('authuser')
export class AuthuserController {
  constructor(private readonly authauserService: AuthuserService) {}

  @ApiTags('autenticacion_user')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(
    @Query('lang') lang:string,
    @Body() createAuthDto: CreateAuthuserDto
  ) {
    return this.authauserService.signIn(
      lang,
      createAuthDto
    );
  }

  @ApiTags('autenticacion_user')
  @Post('refresh')
  refreshToken(
    @Query('lang') lang:string,
    @Body() token: TokenDto
  ) {
    return this.authauserService.refreshToken(
      lang,
      token
    );
  }

  @ApiTags('autenticacion_user')
  @UseGuards(FinalGuard)
  @Get('profile')
  getProfile(
    @Query('lang') lang:string,
    @Request() req
  ) {
    return req.user;
  }
}
