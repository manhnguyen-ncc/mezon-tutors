import { Module } from '@nestjs/common'
import { PrismaModule } from '../../prisma/prisma.module'
import { TrialLessonBookingController } from './trial-lesson-booking.controller'
import { TrialLessonBookingService } from './trial-lesson-booking.service'

@Module({
  imports: [PrismaModule],
  controllers: [TrialLessonBookingController],
  providers: [TrialLessonBookingService],
  exports: [TrialLessonBookingService],
})
export class TrialLessonBookingModule {}
