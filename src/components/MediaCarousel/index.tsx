import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

interface MediaItem {
  src: string;
  label: string;
  type?: 'video' | 'image'; // Optional, will auto-detect if not provided
  alt?: string; // For images
}

interface MediaCarouselProps {
  media: MediaItem[];
  // Backward compatibility
  videos?: MediaItem[];
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  media = [],
  videos = [], // Keep for backward compatibility
}) => {
  // Use media prop if provided, otherwise fall back to videos for backward compatibility
  const items = media.length > 0 ? media : videos;
  
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, items.length);
  }, [items]);

  // Auto-detect media type based on file extension
  const getMediaType = (item: MediaItem): 'video' | 'image' => {
    if (item.type) return item.type;
    
    const extension = item.src.split('.').pop()?.toLowerCase();
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi'];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    
    if (videoExtensions.includes(extension || '')) return 'video';
    if (imageExtensions.includes(extension || '')) return 'image';
    
    // Default to video for backward compatibility
    return 'video';
  };

  // Handle tab click
  const handleTabClick = (index: number) => {
    const currentItem = items[activeIndex];
    const currentType = getMediaType(currentItem);
    
    // Pause current video if it's a video
    if (currentType === 'video' && videoRefs.current[activeIndex]) {
      videoRefs.current[activeIndex].pause();
    }
    
    setActiveIndex(index);
    
    const newItem = items[index];
    const newType = getMediaType(newItem);
    
    // Play new video if it's a video
    if (newType === 'video' && videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  const renderMediaItem = (item: MediaItem, index: number) => {
    const mediaType = getMediaType(item);
    
    if (mediaType === 'image') {
      return (
        <img
          src={item.src}
          alt={item.alt || item.label}
          className={styles.image}
        />
      );
    } else {
      return (
        <video
          ref={el => { if (el) videoRefs.current[index] = el; }}
          src={item.src}
          className={styles.video}
          controls
          muted={true}
          autoPlay={index === activeIndex}
        />
      );
    }
  };

  // Get the type of currently active media
  const activeMediaType = items.length > 0 ? getMediaType(items[activeIndex]) : 'video';

  return (
    <div className={styles.videoCarousel}>
      {/* Tab selection switcher */}
      <div className={styles.videoTabs}>
        {items.map((item, index) => (
          <button
            key={`tab-${index}`}
            className={`${styles.videoTab} ${index === activeIndex ? styles.active : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      {/* Media container */}
      <div className={`${styles.videoContainer} ${activeMediaType === 'image' ? styles.imageContainer : styles.phoneContainer}`}>
        {items.map((item, index) => (
          <div
            key={`media-${index}`}
            className={`${styles.videoItem} ${index === activeIndex ? styles.visible : styles.hidden}`}
          >
            {renderMediaItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaCarousel;