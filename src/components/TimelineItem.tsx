import React from 'react';
import { MapPin, Clock, Route } from 'lucide-react';
import { BikeRide } from '../types/BikeRide';
import { VideoGrid } from './VideoGrid';

interface TimelineItemProps {
  ride: BikeRide;
  isLast: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ ride, isLast }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative pl-8 pb-12">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-4 top-6 w-0.5 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-2 top-4 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-gray-900 shadow-lg"></div>
      
      {/* Content */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 ml-4 hover:shadow-blue-500/10 hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video */}
          <div className="lg:w-3/5">
            <VideoGrid 
              youtubeIds={ride.youtubeIds} 
              title={ride.title}
            />
          </div>
          
          {/* Details */}
          <div className="lg:w-2/5 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{ride.title}</h3>
              <p className="text-blue-400 text-sm mb-3 font-medium">{formatDate(ride.date)}</p>
              <p className="text-gray-300 leading-relaxed">{ride.description}</p>
            </div>
            
            {/* Metadata */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-sm">{ride.location}</span>
              </div>
              
              {ride.distance && (
                <div className="flex items-center text-gray-400">
                  <Route className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm">{ride.distance}</span>
                </div>
              )}
              
              {ride.duration && (
                <div className="flex items-center text-gray-400">
                  <Clock className="h-4 w-4 mr-2 text-orange-600" />
                  <span className="text-sm">{ride.duration}</span>
                </div>
              )}
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {ride.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full border border-blue-600/30 hover:bg-blue-600/30 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};