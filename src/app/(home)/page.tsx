'use client';

import React, { useState, useEffect } from 'react';
import Video from '../../components/Video';
import { CircularProgress, Pagination } from '@nextui-org/react';
import axios from 'axios';

export const BACKEND_URL = 'http://localhost:4000';

export default function Home() {
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState('loading');

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/api/videos?page=${page}&size=${8}`
      );
      setVideos(response.data);
    };
    getVideos();
  }, [page]);

  return (
    <div>
      {videos === 'loading' ? (
        <main className="flex flex-col justify-center items-center h-screen">
          <CircularProgress aria-label="Loading..." />
        </main>
      ) : (
        <main className="flex flex-col justify-center items-center h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {videos.map((video) => (
              <Video
                key={video.id}
                id={video.id}
                title={video.title}
                user={video.displayName}
                viewCount={video.viewCount}
                source={video.source}
              />
            ))}
          </div>
          {videos.length > 0 && (
            <div className="mt-10">
              <div className="flex flex-wrap gap-4 items-center">
                <Pagination
                  key="bordered"
                  total={Math.ceil(videos.length / 8) + 1}
                  initialPage={1}
                  variant="bordered"
                  activepage={page}
                  onChange={(newPage) => setPage(newPage)}
                />
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
