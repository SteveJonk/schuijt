import type { Metadata } from 'next';
import { SentryTest } from '@/components/SentryTest';
import { Wrap } from '@/components/ui/Wrap';

/**
 * Served at `/sentry-test/`: checks the Sentry connection after a deploy.
 * Not linked anywhere, not in the sitemap, and kept out of search results.
 */
export const metadata: Metadata = {
  title: 'Sentry test',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function SentryTestPage() {
  return (
    <main className='flex min-h-[70vh] items-center py-24'>
      <Wrap className='w-full'>
        <h1 className='mb-5 text-[40px]'>Sentry test</h1>
        <SentryTest />
      </Wrap>
    </main>
  );
}
