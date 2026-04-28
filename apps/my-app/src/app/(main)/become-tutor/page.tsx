'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BecomeTutorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/become-tutor/about');
  }, [router]);

  return null;
}
