"use client"
import React ,{ useEffect,useState }from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { auth, provider, signInWithPopup } from "../../../firebase";
import { saveUserProfile } from '../../../lib/user/saveUserProfile'

const carouselData = [
  {
    id: 1,
    name: 'Delivering Hope: Providing Food to Those in Need',
    imageUrl: `https://e3.365dm.com/24/03/1600x900/skynews-gaza-rafah-children_6481695.jpg?20240307133401`,
    description: 'Join our mission to combat hunger by delivering essential food supplies to the most vulnerable communities, ensuring no one goes hungry.'
  },
  {
    id: 2,
    name: 'Restoring Lives: Aid for War-Affected Communities',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*W3lYX-NtPgUbCVqJh2M62Q.jpeg',
    description: 'Support our efforts to provide critical assistance to individuals and families devastated by conflict, helping them rebuild their lives and find hope amidst the chaos.'
  },
  {
    id: 3,
    name: 'Hope for Healing: Medical Aid for Critical Surgeries',
    imageUrl: 'https://hcah-p-001.stylelabs.cloud/api/public/content/b2d0ca3143b44fe98984e3395f458748?w=360&t=w360',
    description: 'Support our mission to provide vital medical aid for individuals facing critical surgeries, offering them a lifeline to recovery and renewed health.'
  },
  {
    id: 4,
    name: 'Empowering Orphaned Children: Providing Essential Support',
    imageUrl: 'https://weareworldchallenge.com/wp-content/uploads/2024/01/Orphanages.jpg',
    description: 'Join us in empowering orphaned children by providing essential support and opportunities for a brighter future, ensuring they receive the care, education, and love they deserve.'
  },
  {
    id: 5,
    name: 'Empowering Communities: Bringing Education to Underserved Areas',
    imageUrl: 'https://assets.globalpartnership.org/s3fs-public/styles/standard_blog_banner/public/blog_post/image/Niger%20-%20Girls%20in%20classroom%20made%20of%20local%20materials.jpg?VersionId=caQcvRVnFYSC5wlW_doFEldbdR1jqCMI&itok=FLYyebHi',
    description: 'Support our initiative to bring education to underserved areas, empowering communities with the knowledge and skills needed for a brighter future.'
  }
];

const page = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({delay:10000})])

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);  // Handle signed-in user info
      await saveUserProfile(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex '>

        <div className='w-3/5  overflow-hidden'>
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {carouselData.map((person) => (
                <div className="embla__slide relative h-screen" key={person.id}>
                  <img className='h-full w-full absolute object-cover' src={person.imageUrl} alt={person.name} />
                  <div className='h-full w-full absolute bg-gradient-to-t from-black to-transparent z-40 '>
                      <div className='h-full flex flex-col justify-end text-white px-5 py-[100px] '>
                        <h2 className='text-3xl my-3'>{person.name}</h2>
                        <p className='text-lg w-2/3'>{person.description}</p>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>      

        <div className='flex-grow'>
          
              <div className='h-full flex flex-col items-center '>
                
                <div className='mt-[100px]'>
                  <h1 className='text-5xl my-2 font-extrabold text-blue-400'>Help All</h1>
                  <p className='text-1xl font-semibold'>Helping All: Together We Make a Difference</p>
               </div>

                <div className='w-full my-5'>
                  <h4 className='text-center text-2xl font-semibold'>Login</h4>
                  <div className=' flex flex-col  max-w-md mx-auto'>
                        <label className='my-1' htmlFor='email'>Email:</label>
                        <input className='border-2 p-1' id='email' type="text" />
                        <label className='my-1' htmlFor='password'>Password</label>
                        <input className='border-2 p-1' id='password' type="text" />
                  </div>
                </div>

                <div className='w-[72%] flex flex-col items-center '>
                     <div className='w-full '>
                          <button onClick={signInWithGoogle} type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
                            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            Sign up with Google firebase<div></div></button>
                     </div>
                </div>

                <div className='my-4'>
                    <p>Don't have a account? <Link href={'/'} className='text-blue-600'>Sign up</Link> </p>
                </div>

              </div>
        </div>      

    </div>
  )
}

export default page