import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAsignacionDto {

  @IsOptional()
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly modulo_padre_id;
  
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly permiso;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly descripcion;

  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly user_id;

}
