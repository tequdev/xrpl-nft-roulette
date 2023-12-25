'use client'
import { NFT } from '@/libs';
import { Roulette, useRoulette } from 'react-hook-roulette';

type Props = {
  items: NFT[];
}

export default function RouletteComponent({ items }: Props) {
  const weightedItems = items.reduce((prev, curr) => {
    const foundIndex = prev.findIndex(item => item.Owner === curr.Owner)
    if (foundIndex > -1) {
      const { weight } = prev[foundIndex]
      prev[foundIndex] = { ...prev[foundIndex], weight: weight + 1 }
      return prev
    }
    return [...prev, { ...curr, weight: 1 }]
  }, [] as Array<NFT & { weight: number }>);

  const filterdItems = weightedItems.map(item => ({ name: item.Owner, weight: item.weight }))

  const { roulette, onStart, onStop, result } = useRoulette({ items: filterdItems });

  return (
    <div>
      <Roulette roulette={roulette} />
      <div className='space-x-2 m-2 flex justify-center'>
        <button className='btn btn-primary' onClick={onStart}>Start</button>
        <button className='btn btn-info' onClick={onStop}>Stop</button>
      </div>
      {result &&
        <div>
          <p>Result: {result}</p>
          <div className='space-x-3 flex justify-center mt-2'>
            <a className='text-blue-400 hover:text-blue-600 no-underline hover:underline' target="_blank" rel="noopener noreferrer" href={`https://xrp.cafe/user/${result}`}  >xrp.cafe</a>
            <a className='text-blue-400 hover:text-blue-600 no-underline hover:underline' target="_blank" rel="noopener noreferrer" href={`https://xrpscan.com/account/${result}`}>XRPScan</a>
            <a className='text-blue-400 hover:text-blue-600 no-underline hover:underline' target="_blank" rel="noopener noreferrer" href={`https://bithomp.com/explorer/${result}`}>Bithomp</a>
          </div>
        </div>
      }
    </div>
  );
};

