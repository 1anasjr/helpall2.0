"use client"
import React, { useState, useEffect } from 'react';
import getUser from '../../../lib/user/getUser';
import { getAllCommunities } from '../../../lib/comunity/getAllComunities';

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
    <div>
      <h1>comunity List</h1>
      <ul>
        {comunity.map((data) => (
          <li key={data.id}>
              name {data.OwnerName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
