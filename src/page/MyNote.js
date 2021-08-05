
import React, { Component, useState, useContext } from 'react';
import NavBar from '../components/Navbar/nav';
import Root from '../components/Navbar/root';
import Context from '../context';
import NoteMain from '../components/NoteMain/NoteMain';
import NoteList from '../components/NoteList/NoteList';
import '../style/MyNote.css';
import MynoteInfo from './MynoteInfo';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';



const MyNote = ({ location }) => {
    let Box = 'show';
    let BoxInfo = 'hide';
    const [BoxToggle, setBoxToggle] = useState(false);
    const [Item, setItem] = useState([]);

    const callback = (openBox, Item, item) => {
        setItem(item);
        setBoxToggle(openBox);
        console.log(Item)
        console.log(item)
    }
    console.log(Item)
    if (BoxToggle) {
        Box = 'hide';
        BoxInfo = 'show';

    } else {
        Box = 'show';
        BoxInfo = 'hide';
    }
    
    return (
        <div>
            <NavBar />
            
            <div className='MyNote-frame'>
                <NoteList parentcallback={callback} />
                <div className={`noteMain-frame ${Box}`}>
                    <NoteMain className='NoteMain' MyNote={location.state ? location.state.lawnote : ''} />
                </div>
                <div className={`noteInfo-frame ${BoxInfo}`}>
                    {Item.length == 0?'':<MynoteInfo item={Item}/>}
                </div>

            </div>
            <Root />
        </div>
    )
}



export default MyNote;