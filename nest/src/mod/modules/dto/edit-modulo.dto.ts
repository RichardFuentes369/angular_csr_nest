import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class EditModuloDto {

  @IsOptional()
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly nombre;
  
  @IsOptional()
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly permiso;  
  
  @IsOptional()
  @IsString()
  // @Transform(({value}) => value.trim())
  readonly descripcion;

  @IsOptional()
  @IsBoolean()
  // @Transform(({value}) => value.trim())
  readonly tiene_submodulos;

  @IsOptional()
  @IsBoolean()
  // @Transform(({value}) => value.trim())
  readonly tiene_permisos;

  
}
