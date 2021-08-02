
import React, { Component, useContext } from 'react';
import NavBar from '../components/Navbar/nav';
import Root from '../components/Navbar/root';
import Context from '../context';
import NoteMain from '../components/NoteMain/NoteMain';
import NoteList from '../components/NoteList/NoteList';
import '../style/MyNote.css';
import { useLocation } from 'react-router-dom';


const MyNote = ({location}) => {
    console.log('我的筆記(存取的法條)',location)
    return (
        <div>
            <NavBar />
            <div className='MyNote-frame'>
                <NoteList MyNote={location.state.lawnote}/>
                <NoteMain MyNote={location.state.lawnote}/>
            </div>
            <Root />
        </div>

    )
}



export default MyNote;