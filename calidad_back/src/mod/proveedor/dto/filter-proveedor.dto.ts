import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

enum Order {
    asc = 'asc',
    desc = 'desc'
  }

export class FilterProveedorDto {

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
    email?: string;    
    
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsNumber()
    isActive?: number;

    @IsOptional()
    @IsString()
    razonSocial?: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsString()
    estado?: string;

    @IsOptional()
    @IsString()
    nit?: string;
    
}