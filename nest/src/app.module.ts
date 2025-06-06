import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import * as path from 'path';
import { I18nModule } from 'nestjs-i18n';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GlobalModule } from './global/global.module';
import { MongooseModule } from '@nestjs/mongoose';

import { 
  AdminModule, 
  AuthadminModule, 
  UserModule, 
  AuthuserModule,
  AsignacionModule,
  ModulosModule,
} from './mod/index'

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGODB), 

    I18nModule.forRoot({
      fallbackLanguage: 'es',
      loaderOptions: {
        path: path.join(__dirname, 'assets/i18n/'),
        watch: true,
      },
      typesOutputPath: path.join(__dirname, '../src/generated/i18n.generated.ts'),
    }),

    GlobalModule, 

    AdminModule,
    AuthadminModule,
    UserModule,
    AuthuserModule,
    ModulosModule,
    AsignacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(){
    // console.log(__dirname, '/i18n/es')
    // console.log(process.env)
  }

}
