import React from 'react';
import PropTypes from "prop-types";

const MyMainLaw = ({ MyNote }) => {
    return (
        <div className='MyMainLaw'>
            <h1>我的法規</h1>
            <p>{MyNote.ArticleNo}</p>
            <p>{MyNote.ArticleContent}</p>
        </div>
    )
}
MyMainLaw.propTypes = {
    MyNote: PropTypes.object.isRequired
};


export default MyMainLaw;