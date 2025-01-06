import React from 'react';

const Search = ({ onSearch }) => {
    return (
        <div>
            <label htmlFor="country-search">Find Countries</label>
            <input
                type="text"
                id="country-search"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default Search;