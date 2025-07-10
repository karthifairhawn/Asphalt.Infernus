import React from 'react';
import { YouTubeEmbed } from './YouTubeEmbed';

interface VideoGridProps {
  youtubeIds: string[];
  title: string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ youtubeIds, title }) => {
  if (youtubeIds.length === 1) {
    return (
      <YouTubeEmbed 
        videoId={youtubeIds[0]} 
        title={title}
        className="shadow-lg"
      />
    );
  }

  if (youtubeIds.length === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {youtubeIds.map((videoId, index) => (
          <YouTubeEmbed 
            key={index}
            videoId={videoId} 
            title={`${title} - Part ${index + 1}`}
            className="shadow-lg"
          />
        ))}
      </div>
    );
  }

  if (youtubeIds.length === 3) {
    return (
      <div className="grid gap-4">
        <YouTubeEmbed 
          videoId={youtubeIds[0]} 
          title={`${title} - Part 1`}
          className="shadow-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <YouTubeEmbed 
            videoId={youtubeIds[1]} 
            title={`${title} - Part 2`}
            className="shadow-lg"
          />
          <YouTubeEmbed 
            videoId={youtubeIds[2]} 
            title={`${title} - Part 3`}
            className="shadow-lg"
          />
        </div>
      </div>
    );
  }

  // For 4+ videos, create a 2x2 grid with overflow handling
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {youtubeIds.map((videoId, index) => (
        <YouTubeEmbed 
          key={index}
          videoId={videoId} 
          title={`${title} - Part ${index + 1}`}
          className="shadow-lg"
        />
      ))}
    </div>
  );
};