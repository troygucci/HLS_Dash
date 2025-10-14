import React, { useEffect, useRef, useState } from 'react';

const App: React.FC = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const video4Ref = useRef<HTMLVideoElement>(null);
  const video5Ref = useRef<HTMLVideoElement>(null);
  const video6Ref = useRef<HTMLVideoElement>(null);

  const hlsUrls = [
    'https://188a2110c0c0aa3d.mediapackage.us-east-2.amazonaws.com/out/v1/9176b706e29b429ba39fb053a93182b7/index.m3u8',
    'https://188a2110c0c0aa3d.mediapackage.us-east-2.amazonaws.com/out/v1/01ab6b4628ab48abb95a79a0f703a43f/index.m3u8',
    'https://3860af3e8e3fbfdb.mediapackage.us-east-2.amazonaws.com/out/v1/805ee0ffea3c411db26aea112cecd3aa/index.m3u8',
    'https://3860af3e8e3fbfdb.mediapackage.us-east-2.amazonaws.com/out/v1/ac45ffbc86f849c78c559c5c8c6f9dbf/index.m3u8',
    'https://your-mediapackage-endpoint-5.mediapackage.region.amazonaws.com/out/v1/your-channel-id-5/index.m3u8',
    'https://your-mediapackage-endpoint-6.mediapackage.region.amazonaws.com/out/v1/your-channel-id-6/index.m3u8'
  ];

  const [selectedUrls, setSelectedUrls] = useState([0, 1, 2, 3, 4, 5]);

  const loadVideo = async (videoRef: React.RefObject<HTMLVideoElement>, urlIndex: number) => {
    if (!videoRef.current) return;
    
    const Hls = (await import('hls.js')).default;
    
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS Error:', data);
      });
      hls.loadSource(hlsUrls[urlIndex]);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current?.play();
      });
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = hlsUrls[urlIndex];
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current?.play();
      });
    }
  };

  useEffect(() => {
    const videoRefs = [video1Ref, video2Ref, video3Ref, video4Ref, video5Ref, video6Ref];
    videoRefs.forEach((ref, index) => {
      loadVideo(ref, selectedUrls[index]);
    });
  }, [selectedUrls]);

  const handleUrlChange = (playerIndex: number, urlIndex: number) => {
    const newSelectedUrls = [...selectedUrls];
    newSelectedUrls[playerIndex] = urlIndex;
    setSelectedUrls(newSelectedUrls);
  };

  const getChannelId = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

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
    videoWrapper: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    videoTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '8px',
      textAlign: 'center' as const
    },
    video: {
      width: '100%',
      height: '200px',
      backgroundColor: '#000'
    },
    ingestText: {
      fontSize: '12px',
      color: '#666',
      marginTop: '4px',
      textAlign: 'center' as const
    },
    dropdown: {
      marginTop: '8px',
      padding: '4px',
      fontSize: '12px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>LS-AMER LPV DASHBOARD</h1>
      <p>If you can see this, React is working!</p>
      <div style={styles.videoContainer}>
        {[video1Ref, video2Ref, video3Ref, video4Ref, video5Ref, video6Ref].map((ref, index) => (
          <div key={index} style={styles.videoWrapper}>
            <div style={styles.videoTitle}>Stream {index + 1}</div>
            <video ref={ref} controls autoPlay muted style={styles.video} />
            <div style={styles.ingestText}>Ingest: {getChannelId(hlsUrls[selectedUrls[index]])}</div>
            <select 
              style={styles.dropdown}
              value={selectedUrls[index]}
              onChange={(e) => handleUrlChange(index, parseInt(e.target.value))}
            >
              {hlsUrls.map((url, urlIndex) => (
                <option key={urlIndex} value={urlIndex}>
                  {getChannelId(url)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;