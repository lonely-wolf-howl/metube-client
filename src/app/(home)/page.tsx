import React from 'react';
import Video from '../../components/Video';
import { Suspense } from 'react';
import { CircularProgress } from '@nextui-org/react';

export default function Home() {
  const mockVideos = [
    {
      id: 1,
      title: '모두가 사랑하는 휴양지',
      user: '영국남자',
      viewCnt: 1,
      source: '/videos/01.mp4',
    },
    {
      id: 2,
      title: '광활한 자연에 압도되다',
      user: '코딩애플',
      viewCnt: 2,
      source: '/videos/02.mp4',
    },
    {
      id: 3,
      title: '카멜레온의 숨겨진 비밀',
      user: '노마드 코더',
      viewCnt: 3,
      source: '/videos/03.mp4',
    },
    {
      id: 4,
      title: '일단 해봐',
      user: '나이키 코리아',
      viewCnt: 4,
      source: '/videos/04.mp4',
    },
    {
      id: 5,
      title: '설원의 고양이들이 살아남는 법',
      user: '미야옹철',
      viewCnt: 5,
      source: '/videos/05.mp4',
    },
  ];

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Suspense fallback={<CircularProgress aria-label="Loading..." />}>
          {mockVideos.map((video) => (
            <Video
              key={video.id}
              id={video.id}
              title={video.title}
              user={video.user}
              viewCnt={video.viewCnt}
              source={video.source}
            />
          ))}
        </Suspense>
      </div>
    </main>
  );
}
