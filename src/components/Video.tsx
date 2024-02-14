'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface VideoProps {
  id: number;
  source: string;
  title: string;
  user: string;
  viewCount: number;
}

const Video = ({ id, title, user, viewCount, source }: VideoProps) => {
  const router = useRouter(() => {});

  const onClick = () => {
    router.push(`/videos/${id}`);
  };

  return (
    <Link href={`/videos/${id}`}>
      <Card className="py-4">
        <CardBody className="overflow-visible py-2">
          <video
            className="rounded-lg"
            width="320"
            height="240"
            controls
            controlsList="nodownload"
          >
            <source src={source} type="video/mp4" />
          </video>
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{title}</h4>
          <small className="text-default-500 font-bold">
            {user} · 조회수 {viewCount}회
          </small>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default Video;
