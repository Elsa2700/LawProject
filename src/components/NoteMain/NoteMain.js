import React, {useState, useContext, useCallback } from 'react';
import { firestore } from '../../database/firebase-service';
import Context from '../../context';


const NoteMain = ({ MyNote }) => {
    
    // console.log('筆記', user.uid)
    // console.log('我的法規', MyNote)

    const MyMainContent = () => {
        const [notecolor, setNoteColor] = useState('MyMainNote-col1');
        const [colorItem, setColorItem] = useState([...Array(4).keys()]);
        const [active, setActive] = useState([]);
        const [value, setValue] = useState('');
        const { user } = useContext(Context);
        console.log('notemain_userid',user.uid)

        const createMyNote = () => {
            firestore
                .collection('users').add({
                    user: user.uid,
                    laws: 'law key',
                    law: MyNote,
                    noteColor: notecolor,
                    noteContent: value
                }).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }


        const handleChange = useCallback(
            (e) => {
                setValue(e.target.value);
            },
            [value]
          );

        const handleSubmit = (e) => {
            createMyNote();
            // e.preventDefault();
        }
        const toggleClass = (e) => {
            const itemactive = colorItem.map(item => item === colorItem[e.currentTarget.value]);
            setNoteColor(e.currentTarget.className.split(' ')[1]);
            setActive([...itemactive])
        }

        const buildcolorItem = colorItem.map((item) => {
            return (
                <button className={`MyMainNote-type MyMainNote-col${item + 1} 
        ${active[item] ? 'col-focus' : null}`}
                    key={item} onClick={toggleClass} value={item}>
                    {active[item]}
                </button>
            )
        })
        return (
            <div className='MyMainNote'>
                <form onSubmit={handleSubmit}>
                    <label>
                        <h1>重點筆記</h1>
                        <textarea className='textarea' placeholder='我的筆記內容.....'
                            value={value} onChange={handleChange} />
                    </label>
                    <input className='MyMainNote-btn' type='submit' value='儲存' />
                </form>
                <div className='MyMainNote-col'>
                    {buildcolorItem}
                </div>
            </div>
        )

    }

    const MyMainLaw = ({ MyNote }) => {
        return (
            <div className='MyMainLaw'>
                <h1>我的法規</h1>
                <p>{MyNote.ArticleNo}</p>
                <p>{MyNote.ArticleContent}</p>
            </div>
        )
    }


    return (
        <div className='NoteMain'>
            <MyMainLaw MyNote={MyNote} />
            <MyMainContent />

        </div>
    )
}

export default NoteMain;