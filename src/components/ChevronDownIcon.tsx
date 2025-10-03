import React from 'react';

interface Props { className?: string }

const ChevronDownIcon: React.FC<Props> = ({ className }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.25 8.29a.75.75 0 0 1 -.02-1.08z"
      clipRule="evenodd"
    />
  </svg>
);

export default ChevronDownIcon;
