'use client';

import { Transition } from '@headlessui/react';
import { FC, useState } from 'react';
import { Card } from './card';
import { createSupabaseClient } from '@/app/_utils/supabase';

type Card = {
  id: string;
  word: string;
  definition: string;
};

type Props = {
  cards: Card[];
};

export const Pile: FC<Props> = ({ cards }) => {
  const [curIndex, setCurIndex] = useState(cards.length - 1);
  const [swipeSide, setSwipeSide] = useState<'R' | 'L'>('R');

  const transform =
    curIndex === cards.length - 1
      ? 'translate-y-96'
      : swipeSide === 'R'
      ? 'translate-x-96 rotate-12'
      : swipeSide === 'L'
      ? '-translate-x-96 -rotate-12'
      : '';

  const handleSwipe =
    (index: number, id: string) => async (side: 'R' | 'L') => {
      if (index > curIndex) {
        return;
      }

      setSwipeSide(side);
      setCurIndex((c) => c - 1);

      const supabase = createSupabaseClient();
      const { data, error } = await supabase
        .from('swipe_log')
        .insert([
          {
            card_id: id,
            is_ok: side === 'R',
          },
        ])
        .select();
    };

  const reset = () => {
    setSwipeSide('R');
    setCurIndex(cards.length - 1);
  };

  return (
    <>
      <div className="relative w-96">
        <div className="absolute w-full">
          <Card id="" word="All done!" definition="" onSwipe={reset} />
        </div>
        {cards.map((card, index) => (
          <div key={card.id} className="absolute w-full">
            <Transition
              show={index <= curIndex}
              enter="transition ease-out duration-500"
              enterFrom={transform}
              leave="transition ease-in duration-500"
              leaveTo={transform}
            >
              <Card {...card} onSwipe={handleSwipe(index, card.id)} />
            </Transition>
          </div>
        ))}
      </div>
    </>
  );
};
