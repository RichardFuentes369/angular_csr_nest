import { PartialType } from '@nestjs/swagger';
import { CreateProveedorDto } from './create-proveedor.dto';
import { IsEmail, IsEnum, IsString } from 'class-validator';

enum Estado {
    activo = 'activo',
    inactivo = 'inactivo'
}


export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {

    @IsString()
    readonly razonSocial;

    @IsString()
    readonly telefono;
    
    @IsEmail()
    readonly email;

    @IsString()
    @IsEnum(Estado)
    readonly estado;

    @IsString()
    readonly nit;

}
