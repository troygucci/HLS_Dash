import React, { useEffect, useRef } from 'react';

const App: React.FC = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadHLS = async () => {
      const Hls = (await import('hls.js')).default;
      
      const hlsUrls = [
        'https://188a2110c0c0aa3d.mediapackage.us-east-2.amazonaws.com/out/v1/1ddb068e1fd24e44b67a6b557edca4ea/index.m3u8',
        'https://your-mediapackage-endpoint-2.mediapackage.region.amazonaws.com/out/v1/your-channel-id-2/index.m3u8',
        'https://your-mediapackage-endpoint-3.mediapackage.region.amazonaws.com/out/v1/your-channel-id-3/index.m3u8'
      ];
      
      const videoRefs = [video1Ref, video2Ref, video3Ref];
      
      videoRefs.forEach((videoRef, index) => {
        if (videoRef.current && Hls.isSupported()) {
          const hls = new Hls();
          hls.on(Hls.Events.ERROR, (event, data) => {
            console.error(`HLS Error on video ${index + 1}:`, data);
          });
          hls.loadSource(hlsUrls[index]);
          hls.attachMedia(videoRef.current);

        } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current.src = hlsUrls[index];

        }
      });
    };
    
    loadHLS();
  }, []);

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f0f0',
      margin: '20px'
    },
    heading: {
      color: 'blue',
      textAlign: 'center' as const
    },
    videoContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px'
    },
    video: {
      width: '100%',
      height: '200px',
      backgroundColor: '#000'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>LS-AMER LPV DASHBOARD</h1>
      <p>If you can see this, React is working!</p>
      <div style={styles.videoContainer}>
        <video ref={video1Ref} controls style={styles.video} />
        <video ref={video2Ref} controls style={styles.video} />
        <video ref={video3Ref} controls style={styles.video} />
      </div>
    </div>
  );
};

export default App;