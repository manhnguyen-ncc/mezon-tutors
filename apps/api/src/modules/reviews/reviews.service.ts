import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async canReview(studentId: string, tutorId: string): Promise<boolean> {
    const existingReview = await this.prisma.tutorReview.findFirst({
      where: {
        reviewerId: studentId,
        tutorId: tutorId,
      },
    });

    return !existingReview;
  }

  async getMyReview(studentId: string, tutorId: string) {
    return this.prisma.tutorReview.findFirst({
      where: {
        reviewerId: studentId,
        tutorId: tutorId,
      },
    });
  }

  async createReview(studentId: string, dto: CreateReviewDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const existingReview = await tx.tutorReview.findFirst({
          where: {
            reviewerId: studentId,
            tutorId: dto.tutorId,
          },
        });

        if (existingReview) {
          throw new BadRequestException('You have already reviewed this tutor');
        }

        const tutor = await tx.tutorProfile.findUnique({
          where: { id: dto.tutorId },
          select: { ratingCount: true, ratingAverage: true },
        });

        if (!tutor) {
          throw new NotFoundException('Tutor not found');
        }

        const newCount = tutor.ratingCount + 1;
        const newAverage =
          (Number(tutor.ratingCount) * Number(tutor.ratingAverage) + dto.rating) / newCount;

        const review = await tx.tutorReview.create({
          data: {
            reviewerId: studentId,
            tutorId: dto.tutorId,
            rating: dto.rating,
            comment: dto.comment,
          },
        });

        await tx.tutorProfile.update({
          where: { id: dto.tutorId },
          data: {
            ratingCount: newCount,
            ratingAverage: newAverage,
          },
        });

        return review;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('You have already reviewed this tutor');
        }
      }
      throw error;
    }
  }

  async updateReview(reviewId: string, studentId: string, dto: UpdateReviewDto) {
    return this.prisma.$transaction(async (tx) => {
      const review = await tx.tutorReview.findUnique({
        where: { id: reviewId },
      });

      if (!review || review.reviewerId !== studentId) {
        throw new NotFoundException('Review not found');
      }

      const tutor = await tx.tutorProfile.findUnique({
        where: { id: review.tutorId },
        select: { ratingCount: true, ratingAverage: true },
      });

      if (!tutor) {
        throw new NotFoundException('Tutor not found');
      }

      const oldRating = review.rating;
      const newRating = dto.rating;
      const currentSum = Number(tutor.ratingCount) * Number(tutor.ratingAverage);
      const newAverage = (currentSum - oldRating + newRating) / tutor.ratingCount;

      const updatedReview = await tx.tutorReview.update({
        where: { id: reviewId },
        data: {
          rating: dto.rating,
          comment: dto.comment,
        },
      });

      await tx.tutorProfile.update({
        where: { id: review.tutorId },
        data: {
          ratingAverage: newAverage,
        },
      });

      return updatedReview;
    });
  }

  async recalculateTutorRating(tutorId: string) {
    return this.prisma.$transaction(async (tx) => {
      const reviews = await tx.tutorReview.findMany({
        where: { tutorId },
        select: { rating: true },
      });

      const ratingCount = reviews.length;
      const ratingAverage = ratingCount > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / ratingCount
        : 0;

      await tx.tutorProfile.update({
        where: { id: tutorId },
        data: {
          ratingCount,
          ratingAverage,
        },
      });

      return { tutorId, ratingCount, ratingAverage };
    });
  }

  async recalculateAllTutorsRating() {
    const tutors = await this.prisma.tutorProfile.findMany({
      select: { id: true },
    });

    const results = await Promise.all(
      tutors.map(tutor => this.recalculateTutorRating(tutor.id))
    );

    return results;
  }
}
