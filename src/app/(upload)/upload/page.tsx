'use client';

import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { BACKEND_URL } from '../../(home)/page';
import axios from 'axios';

export default function Upload() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');

  const handleUpload = () => {
    event.preventDefault();

    if (title === '') {
      alert('Please enter the video title.');
      return;
    }

    const inputElement = document.getElementById('videoUpload');
    if (inputElement) {
      inputElement.click();
    }
  };

  const UploadVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', e.target.files[0]);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/videos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          displayname: encodeURIComponent(session.user.name),
          email: session.user.email,
        },
      });
      alert('Success.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div className="mb-10">
          <Input
            type="text"
            variant="underlined"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            id="videoUpload"
            name="videoUpload"
            onChange={UploadVideo}
            className="hidden"
          />
          <Button color="primary" variant="bordered" onClick={handleUpload}>
            <p className="font-bold text-inherit">Video Upload</p>
          </Button>
        </div>
      </div>
    </main>
  );
}
