import Link from 'next/link';
import React from 'react'

const ComunityCard = ({data}) => {
  const truncateDescription = (description, maxLength) => {
    if (description.split(' ').length > maxLength) {
      const words = description.split(' ');
      return words.slice(0, maxLength).join(' ') + '...';
    }
    return description;
  };
  return (
    <div className='flex justify-between items-center p-3 my-4 bg-[#efeeee]  dark:bg-[#121212] dark:text-white min-h-[120px] rounded-2xl shadow-lg' key={data.id}>
        <div className='' >
            <img className='h-[150px] w-[150px] rounded-full' src={data.thumbnail} alt="" />
        </div>
        <div className='w-3/4'>
            <div className='flex justify-between items-center'>
                <h1 className='my-2 text-xl font-bold'>{data.comunity_name}</h1>
                <button className='px-4 h-9  border-2 border-black rounded-full'>Follow</button>
            </div>
        <Link href={`/comunity/${data.uid}/${data.id}`}>
                <p className='my-2'>{truncateDescription(data.description,50)}</p>
        </Link>
        </div>
    </div>
  )
}

export default ComunityCard