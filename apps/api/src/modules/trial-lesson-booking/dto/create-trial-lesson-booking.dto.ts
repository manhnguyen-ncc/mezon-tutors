import { Type } from 'class-transformer'
import { IsDateString, IsInt, IsString, IsUUID, Matches, Max, Min } from 'class-validator'

export class CreateTrialLessonBookingDto {
  @IsUUID()
  tutorId: string

  @IsDateString()
  date: string

  @IsString()
  @Matches(/^\d{2}:\d{2}$/)
  startTime: string

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number

  @Type(() => Number)
  @IsInt()
  @Min(30)
  @Max(60)
  durationMinutes: number
}
