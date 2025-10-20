'use client';

import { useEffect } from 'react';

interface VideoBackgroundProps {
  videoId: string;
  children?: React.ReactNode;
}

export default function VideoBackground({ videoId, children }: VideoBackgroundProps) {

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create YouTube player when API is ready
    (window as Window & { onYouTubeIframeAPIReady?: () => void; YT?: { Player: new (id: string, config: Record<string, unknown>) => void; PlayerState: { ENDED: number } } }).onYouTubeIframeAPIReady = () => {
      const YT = (window as Window & { YT?: { Player: new (id: string, config: Record<string, unknown>) => void; PlayerState: { ENDED: number } } }).YT;
      if (!YT) return;
      new YT.Player('youtube-background', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          loop: 1,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 1,
          playlist: videoId, // Required for looping - MUST be same as videoId
          mute: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event: { target: { mute: () => void; playVideo: () => void } }) => {
            event.target.mute();
            event.target.playVideo();
          },
          onStateChange: (event: { data: number; target: { playVideo: () => void } }) => {
            // Ensure video loops by restarting when it ends
            const YT = (window as Window & { YT?: { PlayerState: { ENDED: number } } }).YT;
            if (YT && event.data === YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    };
  }, [videoId]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          id="youtube-background"
          className="absolute top-1/2 left-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            width: '100vw',
            height: '100vh',
            minWidth: '177.77vh', // 16:9 aspect ratio minimum width
            minHeight: '56.25vw', // 16:9 aspect ratio minimum height
            maxWidth: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        {children}
      </div>
    </div>
  );
}
