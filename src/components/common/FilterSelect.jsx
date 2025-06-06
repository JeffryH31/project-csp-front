import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FilterSelect = ({ icon, children, ...props }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
        </span>
        <select {...props}>
            {children}
        </select>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </span>
    </div>
);

export default FilterSelect;