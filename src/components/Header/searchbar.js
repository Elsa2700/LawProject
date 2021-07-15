import React from 'react';

const SearchBar = () => {
    return (
        <div className="search-frame">
            <div className='ui search'>
                <form>
                    <div className="ui icon input">
                        <input className="prompt" type="text" placeholder="想要搜尋甚麼呢?" />
                        <i className=" large search icon"></i>
                    </div>
                    <div className="results"></div>
                </form>
        </div>
        </div >
    )
}

export default SearchBar;