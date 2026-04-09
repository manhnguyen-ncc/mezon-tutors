import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ETrialLessonStatus, VerificationStatus } from '@mezon-tutors/db'
import { timeToMinutes, utcDateToHHmm, utcDateToMinutes } from '@mezon-tutors/shared'
import dayjs = require('dayjs')
import { PrismaService } from '../../prisma/prisma.service'
import { CreateTrialLessonBookingDto } from './dto/create-trial-lesson-booking.dto'

@Injectable()
export class TrialLessonBookingService {
  constructor(private readonly prisma: PrismaService) {}

  async hasStudentBookedTutor(studentId: string, tutorId: string) {
    const booking = await this.prisma.trialLessonBooking.findFirst({
      where: {
        studentId,
        tutorId,
        status: {
          not: ETrialLessonStatus.CANCELLED,
        },
      },
      select: {
        id: true,
        status: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return {
      hasBooked: Boolean(booking),
      bookingId: booking?.id ?? null,
      status: booking?.status ?? null,
    }
  }

  async getAcceptedByTutorAndDate(tutorId: string, date: string) {
    const tutor = await this.prisma.tutorProfile.findUnique({
      where: { id: tutorId },
      select: { id: true },
    })

    if (!tutor) {
      throw new NotFoundException(`Tutor with ID ${tutorId} not found`)
    }

    const dayStart = dayjs(`${date}T00:00:00Z`)
    if (!dayStart.isValid()) {
      throw new BadRequestException('Invalid date')
    }

    const dayEnd = dayStart.add(1, 'day')

    const bookings = await this.prisma.trialLessonBooking.findMany({
      where: {
        tutorId,
        status: ETrialLessonStatus.CONFIRMED,
        startAt: {
          gte: dayStart.toDate(),
          lt: dayEnd.toDate(),
        },
      },
      select: {
        id: true,
        startAt: true,
        durationMinutes: true,
      },
      orderBy: {
        startAt: 'asc',
      },
    })

    return {
      items: bookings.map((booking) => ({
        id: booking.id,
        startTime: utcDateToHHmm(booking.startAt),
        durationMinutes: booking.durationMinutes,
      })),
    }
  }

  async createTrialLessonBooking(studentId: string, dto: CreateTrialLessonBookingDto) {
    const bookingStatus = await this.hasStudentBookedTutor(studentId, dto.tutorId)
    if (bookingStatus.hasBooked) {
      if (bookingStatus.status === ETrialLessonStatus.PENDING) {
        throw new ConflictException('Request already sent. Please wait for confirmation')
      }
      throw new ConflictException('You have already booked a trial lesson with this tutor')
    }

    const tutor = await this.prisma.tutorProfile.findUnique({
      where: { id: dto.tutorId },
      select: { id: true, pricePerHour: true, verificationStatus: true },
    })

    if (!tutor || tutor.verificationStatus !== VerificationStatus.APPROVED) {
      throw new NotFoundException(`Tutor with ID ${dto.tutorId} not found`)
    }

    const startAt = dayjs(`${dto.date}T${dto.startTime}:00Z`)
    if (!startAt.isValid()) {
      throw new BadRequestException('Invalid date or startTime')
    }

    if (startAt.isBefore(dayjs())) {
      throw new BadRequestException('Cannot book lesson in the past')
    }

    const bookingDay = dto.dayOfWeek
    const startMinutes = timeToMinutes(dto.startTime)
    const endMinutes = startMinutes + dto.durationMinutes

    const availability = await this.prisma.tutorAvailability.findMany({
      where: {
        tutorId: dto.tutorId,
        dayOfWeek: bookingDay,
        isActive: true,
      },
      orderBy: { startTime: 'asc' },
    })

    const matchedAvailability = availability.find((slot) => {
      const slotStart = timeToMinutes(slot.startTime)
      const slotEnd = timeToMinutes(slot.endTime)
      return startMinutes >= slotStart && endMinutes <= slotEnd
    })

    if (!matchedAvailability) {
      throw new BadRequestException('Selected time is not available for this tutor')
    }

    const dayStart = startAt.startOf('day')
    const dayEnd = dayStart.add(1, 'day')
    const existingBookings = await this.prisma.trialLessonBooking.findMany({
      where: {
        tutorId: dto.tutorId,
        status: {
          in: [ETrialLessonStatus.PENDING, ETrialLessonStatus.CONFIRMED],
        },
        startAt: {
          gte: dayStart.toDate(),
          lt: dayEnd.toDate(),
        },
      },
      select: {
        id: true,
        startAt: true,
        durationMinutes: true,
      },
    })

    const hasOverlap = existingBookings.some((booking) => {
      const bookedStartMinutes = utcDateToMinutes(booking.startAt)
      const bookedEndMinutes = bookedStartMinutes + booking.durationMinutes
      return startMinutes < bookedEndMinutes && endMinutes > bookedStartMinutes
    })

    if (hasOverlap) {
      throw new ConflictException('Selected time overlaps an existing booking')
    }

    const booking = await this.prisma.trialLessonBooking.create({
      data: {
        tutorId: dto.tutorId,
        studentId,
        startAt: startAt.toDate(),
        durationMinutes: dto.durationMinutes,
        priceAtBooking: tutor.pricePerHour,
      },
      select: {
        id: true,
        tutorId: true,
        studentId: true,
        startAt: true,
        durationMinutes: true,
        status: true,
        priceAtBooking: true,
      },
    })

    return booking
  }
}
