import React from 'react';

const SortIcon = ({ direction }) => {
    if (direction === 'ascending') return <span className="ml-1">↑</span>;
    if (direction === 'descending') return <span className="ml-1">↓</span>;
    return <span className="ml-1 text-gray-400">↑↓</span>;
};

export default SortIcon;