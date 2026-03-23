import Link from 'next/link';
import { LoginButton } from '@mezon-tutors/app/components/auth/LoginButton';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050A15] px-6 py-16 text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-2xl border border-white/10 bg-[#0C162C] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-slate-300">Continue with Mezon to access your lessons.</p>
        </div>

        <LoginButton />

        <Link href="/" className="text-sm text-slate-300 hover:text-white">
          Back to home
        </Link>
      </div>
    </main>
  );
}
