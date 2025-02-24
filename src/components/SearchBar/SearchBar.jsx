import { SearchMain } from "./SearchMain";
import React from 'react';
import './search.css';
//import { useState } from 'react';


const SearchBar = () => {
    return (
        <div className="search-main">
            <div className="search-bar">
                <SearchMain />
            </div>
        </div>
    );
};

export default SearchBar