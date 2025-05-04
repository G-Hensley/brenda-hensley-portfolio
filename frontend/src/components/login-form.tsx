import type React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ClientSafeProvider } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

interface LoginFormProps extends React.ComponentPropsWithoutRef<'div'> {
  providers: Record<string, ClientSafeProvider> | null;
}

export function LoginForm({ className, providers, ...props }: LoginFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Continue with your social account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
          }}>
            <div className='flex flex-col gap-6'>
              {providers &&
                Object.values(providers).map((provider: ClientSafeProvider) => (
                  <Button
                    key={provider.id}
                    variant='outline'
                    size='lg'
                    className='w-full bg-neutral-800 hover:bg-neutral-500 cursor-pointer'
                    onClick={() => signIn(provider.id)}>
                    {provider.name === 'GitHub' ? (
                      <div className='flex items-center gap-2'>
                        <FaGithub size={28}/>
                        <p>GitHub</p>
                      </div>
                    ) : (
                      provider.name
                    )}
                  </Button>
                ))}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
