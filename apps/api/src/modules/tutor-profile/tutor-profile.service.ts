import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type {
  SubmitTutorProfileDto,
  TutorAvailabilitySlotDto,
  TutorLanguageDto,
} from '@mezon-tutors/shared';
import { Role } from '@mezon-tutors/db';

@Injectable()
export class TutorProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async upsertByUserId(userId: string, dto: SubmitTutorProfileDto): Promise<void> {
    const ratingAverage = 0;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const profile = await this.prisma.$transaction(async (tx) => {
      if (user.role !== Role.TUTOR) {
        await tx.user.update({
          where: { id: userId },
          data: { role: Role.TUTOR },
        });
      }

      const profile = await tx.tutorProfile.upsert({
        where: { userId },
        update: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          avatar: dto.avatar ?? '',
          videoUrl: dto.videoUrl ?? '',
          country: dto.country,
          introduce: dto.introduce,
          experience: dto.specialization,
          motivate: dto.motivate,
          headline: dto.headline,
          pricePerHour: dto.pricePerHour,
          isProfessional: !!dto.teachingCertificateName,
          verificationStatus: 'pending',
        },
        create: {
          userId: userId,
          firstName: dto.firstName,
          lastName: dto.lastName,
          avatar: dto.avatar ?? '',
          videoUrl: dto.videoUrl ?? '',
          country: dto.country,
          introduce: dto.introduce,
          experience: dto.specialization,
          motivate: dto.motivate,
          headline: dto.headline,
          pricePerHour: dto.pricePerHour,
          ratingAverage,
          verificationStatus: 'pending',
        },
      });

      return profile;
    });

    if (dto.languages?.length && profile) {
      await this.upsertTutorLanguageByUserId(profile.id, dto.languages);
    }

    if (dto.availability?.length && profile) {
      await this.createTutorAvailabilitySlotByUserId(profile.id, dto.availability);
    }
  }

  async upsertTutorLanguageByUserId(userId: string, dto: TutorLanguageDto[]): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const current = await tx.tutorLanguage.findMany({
        where: { tutorId: userId },
      });

      const currentMap = new Map(current.map((l) => [l.languageCode, l]));
      const dtoMap = new Map(dto.map((l) => [l.languageCode, l]));
      const toCreate = dto.filter((l) => !currentMap.has(l.languageCode));
      const toUpdate = dto.filter((l) => currentMap.has(l.languageCode));
      const toDelete = current.filter((l) => !dtoMap.has(l.languageCode));

      if (toCreate.length) {
        await tx.tutorLanguage.createMany({
          data: toCreate.map((l) => ({
            tutorId: userId,
            languageCode: l.languageCode,
            proficiency: l.proficiency,
          })),
        });
      }

      for (const l of toUpdate) {
        await tx.tutorLanguage.update({
          where: {
            tutorId_languageCode: {
              tutorId: userId,
              languageCode: l.languageCode,
            },
          },
          data: {
            proficiency: l.proficiency,
          },
        });
      }

      if (toDelete.length) {
        await tx.tutorLanguage.deleteMany({
          where: {
            tutorId: userId,
            languageCode: {
              in: toDelete.map((l) => l.languageCode),
            },
          },
        });
      }
    });
  }

  async createTutorAvailabilitySlotByUserId(userId: string, dto: TutorAvailabilitySlotDto[]) {
    await this.prisma.tutorAvailability.createMany({
      data: dto.map((a) => ({
        tutorId: userId,
        dayOfWeek: a.dayOfWeek,
        startTime: a.startTime,
        endTime: a.endTime,
        isActive: true,
      })),
    });
  }
}
