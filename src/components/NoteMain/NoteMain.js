import React from 'react';
import PropTypes from "prop-types";
import MyMainContent from './MyMainContent';
import MyMainLaw from './MyMainLaw';

const NoteMain = ({ MyNote }) => {
    return (
        <div className='NoteMain'>
            <MyMainLaw MyNote={MyNote} />
            <MyMainContent MyNote={MyNote} />
        </div>
    )
}

NoteMain.propTypes = {
    MyNote: PropTypes.object.isRequired
};

export default NoteMain;