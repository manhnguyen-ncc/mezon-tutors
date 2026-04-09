import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'
import type { AuthUserPayload } from '../auth/interfaces/auth.interfaces'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateTrialLessonBookingDto } from './dto/create-trial-lesson-booking.dto'
import { TrialLessonBookingService } from './trial-lesson-booking.service'

@Controller('trial-lesson-bookings')
@ApiTags('Trial Lesson Booking')
export class TrialLessonBookingController {
  constructor(private readonly trialLessonBookingService: TrialLessonBookingService) {}

  @Get('occupied')
  async getOccupiedByTutorAndDate(@Query('tutorId') tutorId: string, @Query('date') date: string) {
    return this.trialLessonBookingService.getAcceptedByTutorAndDate(tutorId, date)
  }

  @UseGuards(JwtAuthGuard)
  @Get('already-booked')
  async getAlreadyBookedStatus(@Req() req: Request, @Query('tutorId') tutorId: string) {
    const user = req.user as AuthUserPayload
    return this.trialLessonBookingService.hasStudentBookedTutor(user.sub, tutorId)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() body: CreateTrialLessonBookingDto) {
    const user = req.user as AuthUserPayload
    return this.trialLessonBookingService.createTrialLessonBooking(user.sub, body)
  }
}
