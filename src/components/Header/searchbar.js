
import React from 'react';
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

class SearchBar extends React.Component {
    state = { term: '' }

    onFormSubmit = (e) => {
        e.preventDefault();
    }

    RecordChange = (e) => {
        this.setState({ term: e.target.value })
    }
    render() {
        return (
            <div className="search-frame">
                <div className='ui search'>

                    <form onSubmit={this.onFormSubmit}>
                        <div className="ui icon input">
                            <input
                                className="prompt"
                                type="text"
                                placeholder="想要搜尋甚麼呢?"
                                value={this.state.term}
                                onChange={this.RecordChange} />
                            <Link to={`/LawList?keyword=${this.state.term}`}>
                                <input
                                    style={{ position: 'absolute', marginTop: '15px', marginRight: '15px', right: '0', zIndex: '1', width: '40px', height: '40px', opacity: '0', cursor: 'pointer' }}
                                    type='submit' value='' />
                                <i style={{ position: 'absolute', marginTop: '25px', marginRight: '20px', right: '0' }}
                                    className=" large search icon">
                                </i>
                            </Link>
                        </div>
                    </form>
                </div>
            </div >
        )

    }

}

export default SearchBar;