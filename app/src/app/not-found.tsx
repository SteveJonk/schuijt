import { Button } from '@/components/ui/Button';
import { Kicker } from '@/components/ui/Kicker';
import { Wrap } from '@/components/ui/Wrap';
import { getLayout } from '@/sanity/fetch';

export default async function NotFound() {
  const { ui } = await getLayout();

  return (
    <main className='flex min-h-[70vh] items-center py-24'>
      <Wrap className='w-full'>
        {ui.notFoundKicker ? <Kicker>{ui.notFoundKicker}</Kicker> : null}
        <h1 className='mb-5 text-[40px]'>{ui.notFoundTitle}</h1>
        <p className='mb-9 max-w-[42ch] text-[17px] text-muted'>{ui.notFoundText}</p>
        {ui.notFoundButton ? <Button href='/'>{ui.notFoundButton}</Button> : null}
      </Wrap>
    </main>
  );
}
