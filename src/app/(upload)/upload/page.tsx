'use client';

import React, { useState, ChangeEvent } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { BACKEND_URL } from '../../(home)/page';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function Upload() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');

  const handleUpload = () => {
    event.preventDefault();

    if (title === '') {
      alert('Please enter a video title');
      return;
    }

    const inputElement = document.getElementById('videoUpload');
    if (inputElement) {
      inputElement.click();
    }
  };

  const encrypt = (data: any) => {
    const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_SECRET_KEY as string);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encryptedData.toString();
  };

  const UploadVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', e.target.files[0]);

    const encryptedEmail = encrypt(session?.user?.email);
    const encryptedUsername = encrypt(session?.user?.name);

    try {
      await axios.post(`${BACKEND_URL}/api/videos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          displayname: encryptedUsername,
          email: encryptedEmail,
        },
      });
      alert('Request succeeded');
      window.location.reload();
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
