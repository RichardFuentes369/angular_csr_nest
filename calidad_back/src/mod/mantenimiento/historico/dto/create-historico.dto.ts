// import { Transform } from "class-transformer";
import { IsString, IsBoolean, IsNumber, IsEmail, IsDate } from "class-validator";

export class CreateHistoricoDto {

    @IsString()
    readonly observacion;

    @IsNumber()
    readonly precio;

    @IsString()
    readonly recomendacion;

    @IsNumber()
    readonly orden_id;

    @IsNumber()
    readonly proveedor_id;
}
