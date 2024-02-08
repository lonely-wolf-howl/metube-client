import React from 'react';
import VideoDetail from '../../../../components/VideoDetail';

interface Params {
  params: { id: string };
}

const VideoDetailComponent = ({ params }: Params) => {
  const { id } = params;

  return (
    <main className="flex justify-center items-center h-screen">
      <VideoDetail id={id} />
    </main>
  );
};

export default VideoDetailComponent;
