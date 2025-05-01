import { PartialType } from '@nestjs/swagger';
import { CreateHistoricoDto } from './create-historico.dto';

export class UpdateHistoricoDto extends PartialType(CreateHistoricoDto) {}
