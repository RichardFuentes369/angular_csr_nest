// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail } from "class-validator";

export class CreateZonaDto {

    @IsString()
    readonly nombre;

    @IsString()
    readonly descripcion;
    
    @IsString()
    readonly ubicacion;
    
}
    