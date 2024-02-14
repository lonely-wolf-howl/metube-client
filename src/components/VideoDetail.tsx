'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CircularProgress,
} from '@nextui-org/react';
import { IoMdDownload } from 'react-icons/io';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { BACKEND_URL } from '../app/(home)/page';

const VideoDetail = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const [video, setVideo] = useState('loading');
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const getVideo = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/videos/${id}`);
      setVideo(response.data);
    };
    getVideo();
  }, []);

  useEffect(() => {
    const createDownloadUrl = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/api/videos/${id}/download`
      );
      const url = URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    };
    createDownloadUrl();
  }, []);

  return (
    <div>
      {video === 'loading' ? (
        <main className="flex flex-col justify-center items-center h-screen">
          <CircularProgress aria-label="Loading..." />
        </main>
      ) : (
        <Card className="py-4">
          <CardBody className="overflow-visible py-2">
            <video
              className="rounded-lg"
              width="720"
              height="480"
              controls
              controlsList="nodownload"
            >
              <source src={video.source} type="video/mp4" />
            </video>
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-large">{video.title}</h4>
              <small className="text-default-500 font-bold">
                {video.displayName} · 조회수 {video.viewCount}회
              </small>
            </div>
            <div>
              {session ? (
                <a href={downloadUrl} download={`${video.title}.mp4`}>
                  <Button radius="full">
                    <IoMdDownload />
                    <span className="font-bold text-inherit">동영상 저장</span>
                  </Button>
                </a>
              ) : (
                <Button radius="full" onClick={() => signIn()}>
                  <IoMdDownload />
                  <span className="font-bold text-inherit">동영상 저장</span>
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default VideoDetail;
