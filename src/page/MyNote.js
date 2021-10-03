
import React, { useState, useContext } from 'react';
import NavBar from '../components/Navbar/nav';
import Root from '../components/Navbar/root';
import Context from '../components/LawList/contexts/context';
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
        const [boxToggle, setBoxToggle] = useState(false);
        const [items, setItems] = useState([]);


        const handleToggle = (openBox, items, item) => {
            setItems(item);
            setBoxToggle(openBox);
        }
        if (boxToggle) {
            Box = 'hide';
            BoxInfo = 'show';

        } else {
            Box = 'show';
            BoxInfo = 'hide';
        }


        return (
            <div className={user.email == undefined ? 'hide' : 'show'}>
                <div className='MyNote-frame'>
                    <NoteList toggleItems={handleToggle} />
                    <div className={Box === 'hide' ? 'hide' : 'noteMain-frame'}>
                        <NoteMain className='NoteMain' MyNote={location.state ? location.state.lawnote : ''} />
                    </div>
                    <div className={`noteInfo-frame ${BoxInfo}`}>
                        {items.length == 0 ? '' : <MynoteInfo item={items} />}
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