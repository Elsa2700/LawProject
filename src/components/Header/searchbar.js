
import React, { useState } from 'react';
import LawList from '../LawList/LawList';
import { BrowserRouter as Route, Link, Switch } from "react-router-dom";


const SearchBar = () => {
    const [term, setTerm] = useState('');
    const RecordChange = (e) => {
        setTerm(e.target.value)
    }

    return (
        <div className="search-frame">
            <div className='ui search'>
                <form>
                    <div className="ui icon input">
                        <input
                            className="prompt"
                            type="text"
                            placeholder="想要搜尋甚麼呢?"
                            value={term}
                            onChange={RecordChange} />
                        <Link to={`/LawList?keyword=${term}`}>
                            <i className=" large search icon" />
                        </Link>
                        <Switch>
                            <Route path={`/LawList?keyword=${term}`} component={LawList} />
                        </Switch>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SearchBar;