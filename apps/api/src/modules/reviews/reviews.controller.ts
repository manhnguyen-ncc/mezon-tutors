import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import type { AuthUserPayload } from '../auth/interfaces/auth.interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
@ApiTags('Reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('can-review/:tutorId')
  async canReview(@Req() req: Request, @Param('tutorId') tutorId: string) {
    const user = req.user as AuthUserPayload;
    const canReview = await this.reviewsService.canReview(user.sub, tutorId);
    return { canReview };
  }

  @Get('my-review/:tutorId')
  async getMyReview(@Req() req: Request, @Param('tutorId') tutorId: string) {
    const user = req.user as AuthUserPayload;
    return this.reviewsService.getMyReview(user.sub, tutorId);
  }

  @Post()
  async createReview(@Req() req: Request, @Body() dto: CreateReviewDto) {
    const user = req.user as AuthUserPayload;
    return this.reviewsService.createReview(user.sub, dto);
  }

  @Patch(':reviewId')
  async updateReview(
    @Req() req: Request,
    @Param('reviewId') reviewId: string,
    @Body() dto: UpdateReviewDto,
  ) {
    const user = req.user as AuthUserPayload;
    return this.reviewsService.updateReview(reviewId, user.sub, dto);
  }

  @Post('recalculate/:tutorId')
  @UseGuards(AdminGuard)
  async recalculateTutorRating(@Param('tutorId') tutorId: string) {
    return this.reviewsService.recalculateTutorRating(tutorId);
  }

  @Post('recalculate-all')
  @UseGuards(AdminGuard)
  async recalculateAllTutorsRating() {
    return this.reviewsService.recalculateAllTutorsRating();
  }
}
