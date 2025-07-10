export interface BikeRide {
  id: string;
  title: string;
  date: string;
  youtubeIds: string[]; // Changed from single youtubeId to array
  description: string;
  tags: string[];
  location: string;
  distance?: string;
  duration?: string;
  thumbnail?: string;
}