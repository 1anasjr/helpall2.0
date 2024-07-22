
import React from 'react'
import Image from 'next/image';
import getComunityById from '../../../../lib/comunity/getComunityById';
import generatePost from '../../../../lib/post/generatePost';
import Post from '@/app/components/Post';



const page = async ({params}) => {

   const { slug } = params;
   const uid = slug[0];
   const communityId = slug[1];
   const comminity = await getComunityById(uid,communityId)
   const posts = await generatePost()
//   console.log(posts);
  const {thumbnail,comunity_name,description} = comminity
  return (
    <>
    <div className='space-y-5 mb-10 dark:bg-[#121212] dark:text-white bg-[#efeeee]  rounded-2xl p-4 shadow-lg'>
        <div className='relative'>
            <div className='relative flex rounded-2xl overflow-hidden'>
                <Image height={500} width={500} src={thumbnail} className='w-full object-cover h-[250px]' />
                <div className='h-full w-full absolute bg-gradient-to-t from-black to-transparent z-20 '>
                </div>
            </div>
              <Image height={500} width={500} src={thumbnail} className=' object-cover w-[150px] h-[150px] absolute -bottom-28 left-4 border-[#efeeee] dark:border-[#121212] border-[8px] bg-black z-20 rounded-full' />
        </div>
        <div className='bg-[#efeeee] dark:bg-[#121212] dark:text-white w-full'>
            <div className='ml-[170px]'>
                <h2 className='text-2xl font-medium'>{comunity_name}</h2>
            </div>
        </div>
        <div className='bg-[#efeeee] dark:bg-[#121212] dark:text-white w-full rounded-2xl px-4 pt-9 '>
            <p className=''>{description}</p>
        </div>
    </div>

    <div>
            <h2 className='text-3xl my-3 font-semibold dark:text-white'>Post</h2>
            <hr className='border-2 mb-3 border-blue-400' />
            {posts.map((post,index)=>{
                return post.comunity_id === communityId && post.status === 1 && <Post key={post.id} iswidget={false} index={index} post={post}/>
            })}
    </div>

       
    </>
  )
}

export default page