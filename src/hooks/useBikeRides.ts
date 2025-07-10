import { useState, useEffect } from 'react';
import { BikeRide } from '../types/BikeRide';

export const useBikeRides = () => {
  const [bikeRides, setBikeRides] = useState<BikeRide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBikeRides = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/bikeRides.json');
        if (!response.ok) {
          throw new Error('Failed to fetch bike rides data');
        }
        const data = await response.json();
        // Sort rides by date in descending order (most recent first)
        const sortedData = data.sort((a: BikeRide, b: BikeRide) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setBikeRides(sortedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBikeRides();
  }, []);

  const getAllTags = (): string[] => {
    const tags = new Set<string>();
    bikeRides.forEach(ride => {
      ride.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  };

  return { bikeRides, loading, error, getAllTags };
};