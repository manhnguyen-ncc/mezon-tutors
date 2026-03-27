import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { Request } from 'express'
import type { AuthUserPayload } from '../auth/interfaces/auth.interfaces'
import type {
  PaginatedResponse,
  SubmitTutorProfileDto,
  TutorDetailDto,
  TutorAboutDto,
  TutorScheduleDto,
  TutorReviewsDto,
  TutorResourcesDto,
  VerifiedTutorProfileDto,
} from '@mezon-tutors/shared'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { TutorProfileService } from './tutor-profile.service'
import { VerifiedTutorQueryDto } from './dto/verified-tutor-query.dto'

@Controller('tutor-profiles')
@ApiTags('Tutor Profile')
export class TutorProfileController {
  constructor(private readonly tutorProfileService: TutorProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async HandleSubmitTutorProfile(@Req() req: Request, @Body() body: SubmitTutorProfileDto) {
    const user = req.user as AuthUserPayload
    await this.tutorProfileService.createByUserId(user.sub, body)
    return { success: true }
  }

  @Get('verified')
  async getVerifiedTutors(
    @Query() query: VerifiedTutorQueryDto
  ): Promise<PaginatedResponse<VerifiedTutorProfileDto>> {
    return this.tutorProfileService.getVerifiedTutors(query)
  }

  @Get(':id/about')
  async getTutorAbout(@Param('id') id: string): Promise<TutorAboutDto> {
    return this.tutorProfileService.getTutorAbout(id)
  }

  @Get(':id/schedule')
  async getTutorSchedule(@Param('id') id: string): Promise<TutorScheduleDto> {
    return this.tutorProfileService.getTutorSchedule(id)
  }

  @Get(':id/reviews')
  async getTutorReviews(@Param('id') id: string): Promise<TutorReviewsDto> {
    return this.tutorProfileService.getTutorReviews(id)
  }

  @Get(':id/resources')
  async getTutorResources(@Param('id') id: string): Promise<TutorResourcesDto> {
    return this.tutorProfileService.getTutorResources(id)
  }
}
