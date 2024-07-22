"use client"
import React, { useState, useEffect } from 'react';
import getUser from '../../../lib/user/getUser';
import { getAllCommunities } from '../../../lib/comunity/getAllComunities';
import ComunityCard from '../components/ComunityCard';

const page = () => {
  const [comunity, setcomunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all comunity when the component mounts
    const fetchcomunity = async () => {
      try {
        const comunityData = await getAllCommunities();
        setcomunity(comunityData);
        console.log(comunityData);
      } catch (error) {
        setError('Failed to fetch comunity');
      } finally {
        setLoading(false);
      }
    };

    fetchcomunity();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!comunity) {
    return <div>No comunity found</div>;
  }

  return (
    <div className='mb-5'>
      <h2 className='text-3xl my-3 font-semibold dark:text-white'>Communities</h2>
      <hr className='border-2 mb-3 border-blue-400' />
      <div>
        {comunity.map((data) => (
          <ComunityCard data={data}/>
        ))}
      </div>
    </div>
  );
};

export default page;
