import React, { useState, useMemo } from 'react';
import { TimelineItem } from './TimelineItem';
import { TagFilter } from './TagFilter';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';
import { LoadingSpinner } from './LoadingSpinner';
import { useBikeRides } from '../hooks/useBikeRides';

const ITEMS_PER_PAGE = 4;

export const Timeline: React.FC = () => {
  const { bikeRides, loading, error, getAllTags } = useBikeRides();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const allTags = getAllTags();
  
  const filteredRides = useMemo(() => {
    return bikeRides.filter(ride => {
      const matchesSearch = searchTerm === '' || 
        ride.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ride.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => ride.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [bikeRides, selectedTags, searchTerm]);

  const totalPages = Math.ceil(filteredRides.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRides = filteredRides.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags, searchTerm]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of timeline
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-white">My Bike Adventures</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my favorite bike rides and adventures, captured in video and tagged for easy browsing.
          </p>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-white">My Bike Adventures</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">Error loading bike rides: {error}</p>
          <p className="text-gray-500 mt-2">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">My Bike Adventures</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A collection of my favorite bike rides and adventures, captured in video and tagged for easy browsing.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-6">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearAll={handleClearAllTags}
        />
      </div>

      {/* Results count */}
      {filteredRides.length !== bikeRides.length && (
        <div className="text-center text-gray-400">
          Showing {filteredRides.length} of {bikeRides.length} rides
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {paginatedRides.length > 0 ? (
          paginatedRides.map((ride, index) => (
            <TimelineItem
              key={ride.id}
              ride={ride}
              isLast={index === paginatedRides.length - 1}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No rides found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or tags.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredRides.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredRides.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
};