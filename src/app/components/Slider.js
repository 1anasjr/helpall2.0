"use client"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

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
const Slider = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({delay:5000})])

  return (
    <div className='overflow-hidden rounded-2xl'>
      
          <h2 className='text-3xl my-3 font-semibold dark:text-white'>Campaign</h2>
          <hr className='border-2 mb-3 border-blue-400' />

          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {carouselData.map((person) => (
                <div className="embla__slide relative h-[300px]" key={person.id}>
                  <img className='absolute object-cover h-full w-full' src={person.imageUrl} alt={person.name} />
                  <div className='h-full w-full absolute bg-gradient-to-t from-black to-transparent z-40 '>
                      <div className='h-full flex flex-col justify-end text-white px-5 py-3 '>
                        <h2 className='text-2xl my-3'>{person.name}</h2>
                        <p className='text-lg '>{person.description}</p>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  )
}

export default Slider