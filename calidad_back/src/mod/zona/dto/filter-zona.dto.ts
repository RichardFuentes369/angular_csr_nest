import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
    asc = 'asc',
    desc = 'desc'
  }

export class FilterZonaDto {

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
    nombre?: string;  
    
    @IsOptional()
    @IsString()
    descripcion?: string; 
    
}