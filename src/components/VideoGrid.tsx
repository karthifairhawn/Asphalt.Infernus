import React, { useState } from 'react';
import { YouTubeEmbed } from './YouTubeEmbed';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface VideoGridProps {
  youtubeIds: string[];
  title: string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ youtubeIds, title }) => {
  const [showAll, setShowAll] = useState(false);
  
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

  // For 4+ videos, show first 3 with "See More" functionality
  const visibleVideos = showAll ? youtubeIds : youtubeIds.slice(0, 3);
  const hasMore = youtubeIds.length > 3;

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <YouTubeEmbed 
          videoId={visibleVideos[0]} 
          title={`${title} - Part 1`}
          className="shadow-lg"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleVideos.slice(1).map((videoId, index) => (
            <YouTubeEmbed 
              key={index + 1}
              videoId={videoId} 
              title={`${title} - Part ${index + 2}`}
              className="shadow-lg"
            />
          ))}
        </div>
      </div>
      
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                See More ({youtubeIds.length - 3} more videos)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};