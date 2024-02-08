'use client';

import React from 'react';
import { Button, Card, CardHeader, CardBody } from '@nextui-org/react';
import { IoMdDownload } from 'react-icons/io';

const VideoDetail = ({ id }: { id: string }) => {
  const source = `/videos/0${id}.mp4`;

  return (
    <div>
      <video
        className="rounded-lg"
        width="1080"
        height="720"
        controls
        controlsList="nodownload"
      >
        <source src={source} type="video/mp4" />
      </video>
      <div className="flex gap-4 items-center">
        <div>
          <h4 className="font-bold text-large">동영상 제목</h4>
          <small className="text-default-500 font-bold">
            사용자 · 조회수 ?회
          </small>
        </div>
        <div className="flex-grow"></div>
        <div className="flex gap-4">
          <Button radius="full">
            <IoMdDownload />
            <span className="font-bold text-inherit">동영상 저장</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
