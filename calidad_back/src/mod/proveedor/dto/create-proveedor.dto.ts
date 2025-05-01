// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsEnum } from "class-validator";

enum Estado {
    activo = 'activo',
    inactivo = 'inactivo'
}

export class CreateProveedorDto {

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
