import React, { useCallback, useMemo, useState } from 'react';
import { Group, Button, Slider, Text } from '@mantine/core';
import VideoPlayer from '../components/VideoPlayer';
import videojs from 'video.js';

// Types for video.js
type Player = videojs.Player;

const VideoPage: React.FC = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [volume, setVolume] = useState(100);

  const videoJsOptions = useMemo(() => {
    return {
      controls: true,
      autoplay: false,
      preload: 'auto' as videojs.PlayerOptions['preload'],
      responsive: true,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2],
      poster: 'https://1.img-dpreview.com/files/p/TC190x190S190x190~sample_galleries/5275401087/7345797023.jpg',
      sources: [{ src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4' }],
    };
  }, []); // This ensures `videoJsOptions` remains constant
  
  const handleReady = useCallback((player: videojs.Player) => {
    console.log('Player is ready', player);
  }, []); // This ensures `handleReady` remains constant
  

  const handlePlayPause = () => {
    if (player) {
      if (player.paused()) {
        player.play();
      } else {
        player.pause();
      }
    }
  };

  const handleVolumeChange = (value: number) => {
    if (player) {
      player.volume(value / 100);
      setVolume(value);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <VideoPlayer options={videoJsOptions} onReady={handleReady} />

      <Group align={'center'} mt="md">
        <Button onClick={handlePlayPause}>Play/Pause</Button>

        <Group>
          <Text>Volume</Text>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={100}
            step={1}
            style={{ width: 150 }}
          />
        </Group>
      </Group>
    </div>
  );
};

export default VideoPage;
