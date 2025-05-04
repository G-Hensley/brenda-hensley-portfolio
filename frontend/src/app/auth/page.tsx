'use client';

import { signIn, getProviders } from 'next-auth/react';
import type { ClientSafeProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/login-form';

export default function SignIn() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders();
  }, []);

  return (
    <div className="bg-neutral-900 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm providers={providers}/>
      </div>
    </div>
  );
}
