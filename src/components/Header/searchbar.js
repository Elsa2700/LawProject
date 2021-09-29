
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
                            <input
                                style={{ position: 'absolute', marginTop: '15px', marginRight: '15px', right: '0', zIndex: '1', width: '40px', height: '40px', opacity: '0', cursor: 'pointer' }}
                                type='submit' value='' />
                            <i style={{ position: 'absolute', marginTop: '25px', marginRight: '20px', right: '0' }}
                                className=" large search icon">
                            </i>
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