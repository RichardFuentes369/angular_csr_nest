import { IsString, IsBoolean, IsNumber, IsArray, ArrayNotEmpty, IsIn } from "class-validator";

export class UpdateStatusDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  id: number[]; 

  @IsString()
  @IsIn(['1', '0']) 
  option: '1' | '0'; 
}
