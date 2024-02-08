'use client';

import React from 'react';
import { Button } from '@nextui-org/react';

export default function Upload() {
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.append('video', e.target.files[0]);

    console.log(e.target.files);
  };

  const eventBubbler = () => {
    event.preventDefault();

    const inputElement = document.getElementById('videoUpload');
    if (inputElement) {
      inputElement.click();
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div>
        <input
          type="file"
          id="videoUpload"
          name="videoUpload"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button color="primary" variant="bordered" onClick={eventBubbler}>
          <label htmlFor="videoUpload">
            <p className="font-bold text-inherit">Video Upload</p>
          </label>
        </Button>
      </div>
    </main>
  );
}
