'use client';

import { FC, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

type Props = {
  id: string;
  word: string;
  definition: string;
  onSwipe: (side: 'R' | 'L') => void;
};

export const Card: FC<Props> = ({ id, word, definition, onSwipe }) => {
  const [showDef, setShowDef] = useState(false);

  const handlers = useSwipeable({
    onSwiped: (eventData) => onSwipe(eventData.dir.at(0) as 'R' | 'L'),
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="p-20 w-full flex flex-col gap-32 items-center h-screen border border-white bg-slate-800"
    >
      <div className="flex flex-col items-center gap-8">
        <p className="text-sm">{id}</p>
        <p className="text-3xl font-bold">{word}</p>
      </div>
      <div className="flex-1">{showDef && <p>{definition}</p>}</div>
      <div className="flex gap-8">
        <button
          onClick={() => onSwipe('L')}
          className="w-12 h-12 flex justify-center items-center rounded-full bg-white"
        >
          ❌
        </button>
        <button
          onClick={() => setShowDef((c) => !c)}
          className="w-12 h-12 flex justify-center items-center rounded-full bg-white"
        >
          👁️
        </button>
        <button
          onClick={() => onSwipe('R')}
          className="w-12 h-12 flex justify-center items-center rounded-full bg-white"
        >
          ✅
        </button>
      </div>
    </div>
  );
};
