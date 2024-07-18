'use client'
import { PostProvider } from '@/app/providers/PostProvider'
import React, { useContext } from 'react'

const Page = () => {
    const { posts } = useContext(PostProvider);

    const copyToClipboard = (uid) => {
        navigator.clipboard.writeText(uid).then(() => {
            alert('UID copied to clipboard');
        });
    };

    const shortenUid = (uid) => {
        if (uid.length <= 10) return uid;
        return `${uid.slice(0, 5)}...${uid.slice(-5)}`;
    };

    const truncateText = (text, wordLimit) => {
        const words = text?.split(' ');
        if (words?.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    return (
        <div>
            <h1 className='text-4xl'>Request</h1>
            <hr className='border-2 mb-3 border-blue-400 my-2' />
            <div>
                <table className='w-full'>
                    <thead>
                        <tr className=''>
                            <th className='text-left p-2'>uid</th>
                            <th className='text-left p-2'>Username</th>
                            <th className='text-left p-2'>Title</th>
                            <th className='text-left p-2'>Reason</th>
                            <th className='text-left p-2'>Emergency</th>
                            <th className='text-left p-2'>Type</th>
                            <th className='text-left p-2'>Documents</th>
                            <th className='text-left p-2'>Donation</th>
                            <th className='text-left p-2'>status</th>
                            <th className='text-left p-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => (
                            <tr key={index}>
                                <td className='p-2 text-sm cursor-pointer' onClick={() => copyToClipboard(post.uid)}>
                                    {shortenUid(post.uid)}
                                </td>
                                <td className='p-2'>{post.userName}</td>
                                <td className='p-2'>{post.title}</td>
                                <td className='p-2'>{truncateText(post.recipientDescription,10)}</td>
                                <td className='p-2'>{post.isEmergency === 0? 'not emergency':'emergency'}</td>
                                <td className='p-2'>{post.type}</td>
                                <td className='p-2'>doc</td>
                                <td className='p-2'>{post.totaldonate}</td>
                                <td className='p-2'>pending</td>
                                <td className='p-2'>{post.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page
