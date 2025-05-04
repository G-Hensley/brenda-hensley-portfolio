'use client';

import { signIn, getProviders } from 'next-auth/react';
import type { ClientSafeProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

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
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Sign In</h1>
      {providers &&
        Object.values(providers).map((provider: ClientSafeProvider) => (
          <button
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-105 transition-all duration-300 cursor-pointer'>
            Sign in with {provider.name}
          </button>
        ))}
    </div>
  );
}
