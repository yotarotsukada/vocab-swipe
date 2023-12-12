'use client';

import { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { Card } from './card';
import { Transition } from '@headlessui/react';

type Word = {
  id: string;
  word: string;
  definition: string;
};

const Page: NextPage = () => {
  const words = useMemo(
    () =>
      Array.from<Word>(
        [
          { id: '0001', word: 'Bonjour', definition: 'Hello, Good morning' },
          { id: '0002', word: 'Merci', definition: 'Thank you' },
          { id: '0003', word: 'Chien', definition: 'Dog' },
          { id: '0004', word: 'Chat', definition: 'Cat' },
          { id: '0005', word: 'Fleur', definition: 'Flower' },
          { id: '0006', word: 'Maison', definition: 'House' },
          { id: '0007', word: 'Livre', definition: 'Book' },
          { id: '0008', word: 'Cuisine', definition: 'Kitchen' },
          { id: '0009', word: 'Voiture', definition: 'Car' },
          { id: '0010', word: 'École', definition: 'School' },
          { id: '0011', word: 'Ordinateur', definition: 'Computer' },
          { id: '0012', word: 'Musique', definition: 'Music' },
          { id: '0013', word: 'Fenêtre', definition: 'Window' },
          { id: '0014', word: 'Montagne', definition: 'Mountain' },
          { id: '0015', word: 'Plage', definition: 'Beach' },
          { id: '0016', word: 'Avion', definition: 'Airplane' },
          { id: '0017', word: 'Hôtel', definition: 'Hotel' },
          { id: '0018', word: 'Jardin', definition: 'Garden' },
          { id: '0019', word: 'Pain', definition: 'Bread' },
          { id: '0020', word: 'Café', definition: 'Coffee' },
        ].sort(() => Math.random() - 0.5)
      ),
    []
  );

  const [curIndex, setCurIndex] = useState(words.length - 1);
  const [swipeSide, setSwipeSide] = useState<'R' | 'L'>('R');
  const transform =
    swipeSide === 'R'
      ? 'translate-x-96 rotate-12'
      : '-translate-x-96 -rotate-12';

  const changeWord = (side: 'R' | 'L') => {
    setSwipeSide(side);
    setCurIndex((c) => c - 1);
  };

  return (
    <>
      <div className="flex w-screen justify-center">
        <div className="relative w-96">
          <div className="absolute">
            <Card
              id="0000"
              word="All done!"
              definition=""
              onSwipe={() => setCurIndex(words.length - 1)}
            />
          </div>
          {words.map((word, index) => (
            <div key={word.id} className="absolute">
              <Transition
                show={index <= curIndex}
                enter="transition ease-out duration-500"
                enterFrom={`transform ${transform}`}
                enterTo="transform translate-x-0"
                leave="transition ease-in duration-500"
                leaveFrom="transform translate-x-0"
                leaveTo={`transform ${transform}`}
              >
                {!!word ? (
                  <Card {...word} onSwipe={changeWord} />
                ) : (
                  <>
                    <p className="flex-1">All done!</p>
                    <button onClick={() => setCurIndex(words.length - 1)}>
                      ↩️
                    </button>
                  </>
                )}
              </Transition>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
