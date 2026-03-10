import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TutorApplicationRejectBodyDto {
  @ApiPropertyOptional({ description: 'Optional feedback for the tutor' })
  @IsOptional()
  @IsString()
  feedback?: string;
}
