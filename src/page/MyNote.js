
import React, { useState, useContext } from 'react';
import NavBar from '../components/Navbar/nav';
import Root from '../components/Navbar/root';
import Context from '../context';
import NoteMain from '../components/NoteMain/NoteMain';
import NoteList from '../components/NoteList/NoteList';
import '../style/MyNote.css';
import MynoteInfo from './MynoteInfo';
import PropTypes from "prop-types";



const MyNote = ({ location }) => {
    const { user } = useContext(Context);

    const MyNoteContent = () => {

        let Box = 'show';
        let BoxInfo = 'hide';
        const [BoxToggle, setBoxToggle] = useState(false);
        const [Item, setItem] = useState([]);


        const callback = (openBox, Item, item) => {
            console.log(Item)
            setItem(item);
            setBoxToggle(openBox);
        }
        if (BoxToggle) {
            Box = 'hide';
            BoxInfo = 'show';

        } else {
            Box = 'show';
            BoxInfo = 'hide';
        }
        console.log(Box, BoxInfo)
        console.log(Item)


        return (
            <div className={user.email == undefined ? 'hide' : 'show'}>
                <div className='MyNote-frame'>
                    <NoteList parentcallback={callback} />
                    <div className={`noteMain-frame ${Box}`}>
                        <NoteMain className='NoteMain' MyNote={location.state ? location.state.lawnote : ''} />
                    </div>
                    <div className={`noteInfo-frame ${BoxInfo}`}>
                        {Item.length == 0 ? '' : <MynoteInfo item={Item} />}
                    </div>
                </div>
            </div>
        )
    }
    const WarmInfo = () => {
        return (
            <div className={user.email !== undefined ? 'hide' : 'show'}>
                <div className='warning'>
                    請先註冊或登入會員
                </div>
            </div>

        )
    }

    return (
        <div>
            <NavBar />
                <MyNoteContent />
                <WarmInfo />
            <Root />
        </div>
    )
}

MyNote.propTypes = {
    location: PropTypes.object.isRequired,
  };

export default MyNote;