import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
    asc = 'asc',
    desc = 'desc'
  }

export class FilterOrdenDto {

    @IsPositive()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsNumber()
    @Min(1)
    page?: number;

    @IsOptional()
    @IsString()
    field?: string;

    @IsOptional()
    @IsString()
    @IsEnum(Order)
    order?: string;



    @IsOptional()
    @IsString()
    serial?: string;    
    
    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsString()
    precio?: string;

    @IsOptional()
    @IsString()
    fecha_mantenimiento_inicio?: string;

    @IsOptional()
    @IsString()
    fecha_mantenimiento_fin?: string;

    @IsOptional()
    @IsString()
    fecha_creacion?: string;

    @IsOptional()
    @IsString()
    estado?: string;

    @IsOptional()
    @IsString()
    zona_id?: string;
    
}