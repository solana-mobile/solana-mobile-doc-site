import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

interface VideoItem {
  src: string;
  label: string;
}

interface VideoCarouselProps {
  videos: VideoItem[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos = [],
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos]);

  // Handle tab click
  const handleTabClick = (index: number) => {
    // Pause current video
    if (videoRefs.current[activeIndex]) {
      videoRefs.current[activeIndex].pause();
    }
    
    setActiveIndex(index);
    
    // Play new video
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  return (
    <div className={styles.videoCarousel}>
      {/* Tab selection switcher - moved to top */}
      <div className={styles.videoTabs}>
        {videos.map((video, index) => (
          <button
            key={`tab-${index}`}
            className={`${styles.videoTab} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {video.label}
          </button>
        ))}
      </div>
      
      {/* Video container - moved to bottom */}
      <div className={styles.videoContainer}>
        {videos.map((video, index) => (
          <div
            key={`video-${index}`}
            className={`${styles.videoItem} ${index === activeIndex ? styles.visible : styles.hidden}`}
          >
            <video
              ref={el => { if (el) videoRefs.current[index] = el; }}
              src={video.src}
              className={styles.video}
              controls
              muted={true}
              autoPlay={index === activeIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;