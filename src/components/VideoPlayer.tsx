import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Box } from '@mantine/core';

type Player = videojs.Player;
type PlayerOptions = videojs.PlayerOptions;

interface VideoPlayerProps {
  options: PlayerOptions;
  onReady?: (player: Player) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ options, onReady }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Ensure that we initialize the player only if it doesn't already exist
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, options, () => {
        console.log('Video.js player is ready');
        if (onReady) {
          onReady(playerRef.current!);
        }

      });
    }

    videoRef.current?.addEventListener('start', () => {
      if (playerRef.current) {
        console.log("video started");
        // playerRef.current.dispose();
        // playerRef.current = null;
      }
    })

    // Cleanup the player on unmount or if options change
    return () => {
      if (playerRef.current) {
        console.log("Disposing of the player");
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, onReady]); // Only re-run when `options` or `onReady` changes

  return (
    <Box>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-theme-city"/>
        {/* <div style={{ width: '100%', height: '100%', maxWidth: '700px', maxHeight: '100%'}}>
          <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' controls/>

        </div> */}
      </div>
    </Box>
  );
};

export default VideoPlayer;
