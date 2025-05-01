import { PartialType } from '@nestjs/swagger';
import { CreateOrdenDto } from './create-orden.dto';
import { IsEmpty, IsEnum, IsNumber, IsString } from 'class-validator';

enum Estado {
    EnEspera = 'EnEspera',
    Iniciado = 'Iniciado',
    Pausado = 'Pausado',
    Finalizado = 'Finalizado'
}


export class UpdateOrdenDto extends PartialType(CreateOrdenDto) {

    @IsString()
    @IsEnum(Estado)
    readonly estado;

    @IsNumber()
    readonly fecha_actualizacion = Math.floor(Date.now() / 1000);
    
}
