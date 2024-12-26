import React from 'react';

const ProgressBar = ({ progress, color }) => {
  // Cap the progress at 100
  const cappedProgress = Math.min(progress, 100);

  return (
    <div className="mb-1 text-base font-medium dark:text-white">
      <div className="w-full bg-gray-700 rounded-full h-2 mb-4 dark:bg-gray-700">
        <div
          className={`h-2 rounded-full`}
          style={{
            width: `${cappedProgress}%`,
            backgroundColor: color, // Set the color dynamically
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
