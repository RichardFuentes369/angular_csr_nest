import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateModuloDto {

  @IsOptional()
  @IsNumber()
  // @Transform(({value}) => value.trim())
  readonly modulo_padre_id;
  
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;  
  
  @IsBoolean()
  // @Transform(({value}) => value.trim())
  readonly tiene_submodulos;

  @IsBoolean()
  // @Transform(({value}) => value.trim())
  readonly tiene_permisos;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly permiso;

  @IsString()
  // @Transform(({value}) => value.trim())
  readonly descripcion;
  
}
