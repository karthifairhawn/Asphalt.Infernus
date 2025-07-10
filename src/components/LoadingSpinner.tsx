import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">Loading bike rides...</p>
      </div>
    </div>
  );
};