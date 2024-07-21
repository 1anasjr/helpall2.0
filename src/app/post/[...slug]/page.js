
import React from 'react'
import getPostById from '../../../../lib/post/getPostById';
import Image from 'next/image';
import DonationProgress from '@/app/components/DonationProgress';
import Comments from '@/app/components/Comments';


const page = async ({params}) => {

   const { slug } = params;
   const uid = slug[0];
   const postId = slug[1];
   const post = await getPostById(uid,postId)

  const { totaldonate ,date,currentDonation, isEmergency, recipientDescription, title, email , userName, profileImg , thumbnail} = post;
  const percentage = currentDonation/totaldonate * 100
  const formateDate = new Date(date);

  return (
    <div className='space-y-5 mb-10 dark:text-white'>
        <div className='relative flex rounded-2xl overflow-hidden'>
           <Image height={500} width={500} src={thumbnail} className='w-full object-cover h-[250px]' />
           <div className='h-full w-full absolute bg-gradient-to-t from-black to-transparent z-20 '>
           </div>
        </div>

        <div>
            <h2 className='text-4xl font-medium'>{title}</h2>
            <div className='my-5 mr-3 flex'>
                <Image src={profileImg} className='rounded-full' width={60} height={60}/>
                <div className='ml-3'>
                    <h5 className='font-semibold'>{userName}</h5>
                    <div className='font-light'>At {formateDate.getDate()}/{formateDate.getMonth()}/{formateDate.getFullYear()}</div>
                </div>
            </div>
        </div>

        <div>
            <p className='text-justify text-pretty'>{recipientDescription}</p>
        </div>

       <DonationProgress totaldonate={totaldonate} currentDonation = {currentDonation} percentage={percentage}/>
       <Comments uid={uid} postId={postId} userName={userName} />
    </div>
  )
}

export default page