import { createSupabaseClient } from '@/app/_utils/supabase';
import { NextPage } from 'next';
import { Card } from './card';
import { Pile } from './pile';

type Card = {
  id: string;
  word: string;
  definition: string;
};

const Page: NextPage = async () => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from('card').select('*');
  if (!data || error) {
    console.error(error);
    throw new Error();
  }
  const cards = Array.from<Card>(data).sort(() => Math.random() - 0.5);

  return (
    <>
      <div className="flex w-screen justify-center">
        <Pile cards={cards} />
      </div>
    </>
  );
};

export default Page;
