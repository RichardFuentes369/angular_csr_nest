import { PartialType } from '@nestjs/swagger';
import { CreateZonaDto } from './create-zona.dto';
import { IsString } from 'class-validator';

export class UpdateZonaDto extends PartialType(CreateZonaDto) {

    @IsString()
    readonly nombre;

    @IsString()
    readonly descripcion;
    
    @IsString()
    readonly ubicacion;
    
}
