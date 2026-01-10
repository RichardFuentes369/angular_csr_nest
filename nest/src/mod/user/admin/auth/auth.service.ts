import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AdminService } from '@module/user/admin/user/admin.service';
import { JwtService } from '@nestjs/jwt';

import { I18nService } from 'nestjs-i18n';

import { CreateAuthadminDto } from './dto/create-auth.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthadminService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private i18n: I18nService
  ) {}
  
  async signIn(
    lang: string,
    createAdminDto: CreateAuthadminDto
  ): Promise<any> {
    const user = await this.adminService.findUsernameEmail(createAdminDto.username);
    if(!user || user == null){
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_NOT_REGISTER', { lang }) }
      );
    }
    if(user.isActive == false){
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_IS_DESACTIVED', { lang }) }
      );
    }
    if (user.password !== createAdminDto.pass) {
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.PASSWORD_INVALID', { lang }) }
      );
    }
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async refreshToken(
    lang: string,
    tokenDto: TokenDto
  ): Promise<any> {
    const tokenUsuario = await this.jwtService.decode(tokenDto.token)
    if(!tokenUsuario){
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_INVALID', { lang }) }
      )
    }
    const user = await this.adminService.findUsernameEmail(tokenUsuario.email);
    if(!user){
      throw new NotFoundException(
        this.i18n.t('auth.ERROR', { lang }), { cause: new Error(), description: this.i18n.t('auth.MSN_NOT_REGISTER', { lang }) }
      )
    }
    const payload = { id: user.id, email: user.email };
    const token = await  this.jwtService.sign(payload);
    return token;
  }
}
