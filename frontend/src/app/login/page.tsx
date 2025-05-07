'use client';

import { LoginForm } from '@/components/login-form';
import { getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import type { ClientSafeProvider } from 'next-auth/react';

export default function Page() {
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
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm providers={providers} />
      </div>
    </div>
  );
}
