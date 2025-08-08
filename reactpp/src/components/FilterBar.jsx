import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="filter-bar">
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Toutes</button>
      <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>À faire</button>
      <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Terminées</button>
    </div>
  );
};

export default FilterBar;
