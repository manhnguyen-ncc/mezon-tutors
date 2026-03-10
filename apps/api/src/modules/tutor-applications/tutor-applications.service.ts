import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@mezon-tutors/db';
import type { TutorApplicationApiItem } from '@mezon-tutors/shared';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TutorApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(): Promise<TutorApplicationApiItem[]> {
    const profiles = await this.prisma.tutorProfile.findMany({
      include: {
        languages: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return profiles.map((p) => this.toApiItem(p));
  }

  async approve(
    id: string,
    _body?: { feedback?: string }
  ): Promise<{ success: boolean }> {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });
    if (!profile) {
      throw new NotFoundException(`Tutor application not found: ${id}`);
    }
    await this.prisma.$transaction([
      this.prisma.tutorProfile.update({
        where: { id },
        data: { verificationStatus: 'approved' },
      }),
      this.prisma.user.update({
        where: { id: profile.userId },
        data: { role: Role.TUTOR },
      }),
    ]);
    return { success: true };
  }

  async reject(
    id: string,
    _body?: { feedback?: string }
  ): Promise<{ success: boolean }> {
    const profile = await this.prisma.tutorProfile.findUnique({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException(`Tutor application not found: ${id}`);
    }
    await this.prisma.tutorProfile.update({
      where: { id },
      data: { verificationStatus: 'rejected' },
    });
    return { success: true };
  }

  private toApiItem(
    p: {
      id: string;
      userId: string;
      firstName: string;
      lastName: string;
      avatar: string;
      videoUrl: string;
      country: string;
      subject: string;
      introduce: string;
      experience: string;
      motivate: string;
      headline: string;
      verificationStatus: string;
      createdAt: Date;
      languages?: { languageCode: string }[];
    }
  ): TutorApplicationApiItem {
    return {
      id: p.id,
      user_id: p.userId,
      first_name: p.firstName,
      last_name: p.lastName,
      avatar: p.avatar,
      video_url: p.videoUrl,
      country: p.country,
      subject: p.subject,
      introduce: p.introduce,
      experience: p.experience,
      motivate: p.motivate,
      headline: p.headline,
      verification_status: p.verificationStatus,
      created_at: p.createdAt.toISOString(),
      languages: p.languages?.map((l) => ({ language_code: l.languageCode })) ?? [],
    };
  }
}
