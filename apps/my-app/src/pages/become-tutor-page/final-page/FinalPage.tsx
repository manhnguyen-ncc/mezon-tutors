'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, Mail, Info } from 'lucide-react';

export function FinalPage() {
  const t = useTranslations('TutorProfile.Completion');
  const router = useRouter();

  const footerLinks = t.raw('footer.links') as string[];

  return (
    <div className="min-h-screen become-tutor-shell">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <div className="relative">
            <div 
              className="w-28 h-28 rounded-full bg-[#6c5ce7] flex items-center justify-center shadow-lg"
              style={{
                boxShadow: '0 18px 40px rgba(108, 92, 231, 0.6)'
              }}
            >
              <CheckCircle size={56} className="text-white" />
            </div>
          </div>

          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl font-bold text-gray-900">
              {t('title')}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed px-4">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex gap-6 flex-wrap justify-center">
            <Card className="w-64 become-tutor-card rounded-xl shadow-sm border">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Clock size={28} className="text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('reviewPeriodTitle')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('reviewPeriodValue')}
                </p>
              </CardContent>
            </Card>

            <Card className="w-64 become-tutor-card rounded-xl shadow-sm border">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Mail size={28} className="text-purple-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t('notificationTitle')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('notificationValue')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              size="lg"
              className="bg-[#6c5ce7] hover:bg-[#5a4fcf] px-8"
              onClick={() => router.push('/')}
            >
              {t('primaryCta')}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="px-8"
              onClick={() => router.push('/')}
            >
              {t('secondaryCta')}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Info size={16} />
            <p className="text-sm">
              {t('helpText')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
