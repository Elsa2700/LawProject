
import React from 'react';
import Slogan from './slogan';
import SearchBar from './searchbar';

const Header = () => {
    return (
        <div>
            <div className="header-frame">
                <Slogan />
                <SearchBar className="searchBar" />
            </div>
        </div>

    )
}


export default Header;