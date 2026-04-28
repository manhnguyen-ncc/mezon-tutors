'use client';

import { useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Check, X, Video, AlertCircle } from 'lucide-react';
import {
  tutorProfileVideoAtom,
  markStepCompletedAtom,
  tutorProfileLastSavedAtAtom,
} from '@mezon-tutors/app/store/tutor-profile.atom';
import { formatLastSavedTime, BECOME_TUTOR_STEPS, calculateStepProgress } from '@mezon-tutors/shared';

const CURRENT_STEP = BECOME_TUTOR_STEPS.VIDEO;
const PROGRESS_PERCENT = calculateStepProgress(CURRENT_STEP);

type VideoFormValues = {
  videoLink: string;
};

function parseYouTubeId(url: string): string | null {
  const trimmed = url.trim();
  const match =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/.exec(
      trimmed
    );
  return match ? match[1] : null;
}

function parseVimeoId(url: string): string | null {
  const trimmed = url.trim();
  const match = /vimeo\.com\/(?:video\/)?(\d+)/.exec(trimmed);
  return match ? match[1] : null;
}

export function VideoPage() {
  const t = useTranslations('TutorProfile.Video');
  const router = useRouter();
  const [videoState, setVideoState] = useAtom(tutorProfileVideoAtom);
  const [, markStepCompleted] = useAtom(markStepCompletedAtom);
  const { videoLink, videoId } = videoState;
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [durationError, setDurationError] = useState<string | null>(null);
  const videoInputSectionRef = useRef<HTMLDivElement | null>(null);
  const [lastSavedAt, setLastSavedAt] = useAtom(tutorProfileLastSavedAtAtom);

  const form = useForm<VideoFormValues>({
    defaultValues: {
      videoLink: videoLink ?? '',
    },
    mode: 'onChange',
  });

  const { control, handleSubmit } = form;

  const draftSavedLabel =
    lastSavedAt && formatLastSavedTime(lastSavedAt)
      ? t('draftSaved', { time: formatLastSavedTime(lastSavedAt) })
      : '';

  const successAccent = 'rgb(34, 197, 94)';
  const dangerAccent = 'rgb(249, 115, 115)';

  const bestPractices = t.raw('bestPractices') as string[];
  const avoidItems = t.raw('avoidItems') as string[];

  const handleAddLink = async (values: VideoFormValues) => {
    setDurationError(null);
    setVideoDuration(null);

    const trimmed = (values.videoLink ?? '').trim();
    if (!trimmed) {
      setDurationError(t('errors.emptyLink'));
      return;
    }

    let nextId: { type: 'youtube' | 'vimeo'; id: string } | null = null;

    const ytId = parseYouTubeId(trimmed);
    if (ytId) {
      nextId = { type: 'youtube', id: ytId };
    } else {
      const vimeoId = parseVimeoId(trimmed);
      if (vimeoId) {
        nextId = { type: 'vimeo', id: vimeoId };
      }
    }

    if (!nextId) {
      setDurationError(t('errors.invalidLink'));
      setVideoState((prev) => ({ ...prev, videoLink: trimmed, videoId: null }));
      return;
    }

    try {
      const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const data = (await res.json()) as { duration?: number };
        const durationSeconds = typeof data.duration === 'number' ? data.duration : null;

        if (durationSeconds !== null) {
          setVideoDuration(durationSeconds);
          if (durationSeconds > 120) {
            setDurationError(t('errors.tooLong'));
            setVideoState((prev) => ({ ...prev, videoLink: trimmed, videoId: null }));
            return;
          }
        }
      }
    } catch {}

    setVideoState((prev) => ({ ...prev, videoLink: trimmed, videoId: nextId }));
    setLastSavedAt(new Date().toISOString());
  };

  const handleContinue = (values: VideoFormValues) => {
    if (!videoId) {
      setDurationError(t('errors.missingBeforeContinue'));
      const section = videoInputSectionRef.current;
      section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (videoDuration !== null && videoDuration > 120) {
      setDurationError(t('errors.tooLong'));
      return;
    }
    markStepCompleted(CURRENT_STEP);
    router.push('/become-tutor/availability');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
              <p className="text-gray-600 mt-1">{t('subtitle')}</p>
            </div>
            {draftSavedLabel && (
              <Badge variant="secondary" className="text-sm">
                {draftSavedLabel}
              </Badge>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{t('stepLabel')}</span>
              <span className="text-sm text-gray-500">
                {t('progressPercentLabel', { percent: PROGRESS_PERCENT })}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#6c5ce7] h-2 rounded-full transition-all duration-300"
                style={{ width: `${PROGRESS_PERCENT}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6" ref={videoInputSectionRef}>
            <Card 
              className="overflow-hidden rounded-xl shadow-sm border-2"
              style={{ 
                borderColor: 'rgb(125, 211, 252)'
              }}
            >
              <CardContent className="p-0">
                <div 
                  className="relative bg-gray-100"
                  style={{ aspectRatio: '16/9', minHeight: '180px' }}
                >
                  {videoId ? (
                    <iframe
                      src={
                        videoId.type === 'youtube'
                          ? `https://www.youtube.com/embed/${videoId.id}?rel=0`
                          : `https://player.vimeo.com/video/${videoId.id}?autoplay=0`
                      }
                      title="Profile video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 bg-gray-100">
                      <Video size={44} className="text-gray-400" />
                      <p className="text-gray-500 text-sm text-center max-w-xs">
                        {t('previewPlaceholder')}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                      {t('link.label')}
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <Controller
                      control={control}
                      name="videoLink"
                      render={({ field: { value, onChange } }) => (
                        <Input
                          className="flex-1"
                          placeholder={t('link.placeholder')}
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                      )}
                    />
                    <Button
                      onClick={handleSubmit(handleAddLink)}
                      className="bg-[#6c5ce7] hover:bg-[#5a4fcf]"
                    >
                      {t('link.addButton')}
                    </Button>
                  </div>
                  {durationError && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {durationError}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-green-200 bg-green-50 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle size={24} style={{ color: successAccent }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: successAccent }}>
                    {t('bestPracticesTitle')}
                  </h3>
                </div>
                <div className="space-y-3">
                  {bestPractices.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check size={16} style={{ color: successAccent }} className="mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50 rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle size={22} style={{ color: dangerAccent }} />
                  </div>
                  <h3 className="font-bold text-lg" style={{ color: dangerAccent }}>
                    {t('avoidTitle')}
                  </h3>
                </div>
                <div className="space-y-3">
                  {avoidItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X size={14} style={{ color: dangerAccent }} className="mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between">
            <Button
              variant="outline"
              onClick={() => router.push('/become-tutor/certification')}
            >
              {t('back')}
            </Button>
            <Button
              onClick={handleSubmit(handleContinue)}
              className="bg-[#6c5ce7] hover:bg-[#5a4fcf]"
            >
              {t('continue')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
