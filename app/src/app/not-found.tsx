import { Button } from '@/components/ui/Button';
import { Kicker } from '@/components/ui/Kicker';
import { Wrap } from '@/components/ui/Wrap';

export default function NotFound() {
  return (
    <main className='flex min-h-[70vh] items-center py-24'>
      <Wrap className='w-full'>
        <Kicker>404</Kicker>
        <h1 className='mb-5 text-[40px]'>Deze pagina bestaat niet</h1>
        <p className='mb-9 max-w-[42ch] text-[17px] text-muted'>
          De link is verlopen, verplaatst of heeft nooit bestaan. Ga terug naar de homepage of
          neem contact met ons op.
        </p>
        <Button href='/'>Terug naar home</Button>
      </Wrap>
    </main>
  );
}
