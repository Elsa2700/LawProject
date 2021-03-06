import React, { useState, useContext, useCallback } from 'react';
import { firestore } from '../../database/firebase-service';
import Context from '../LawList/contexts/context';
import PropTypes from "prop-types";

const MyMainContent = ({ MyNote }) => {
    const colorItem = [...Array(4).keys()];
    const [notecolor, setNoteColor] = useState('MyMainNote-col1');
    const [active, setActive] = useState([]);
    const [value, setValue] = useState('');
    const { user } = useContext(Context);
    const [order, setOrder] = useState(Date().toLocaleString().split("GMT")[0]);
    const [count, setCount] = useState(0);

    const createMyNote = () => {
        
        if (!MyNote) {
            history.go(-1)
        } else {
            firestore
                .collection('users').add({
                    user: user.uid,
                    laws: MyNote.lawKey,
                    law: MyNote,
                    noteColor: notecolor,
                    noteContent: value,
                    order: order,
                    count: count
                }).then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }
    }


    const handleChange = useCallback(
        (e) => {
            setValue(e.target.value);
        },
        [value]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrder(Date().toLocaleString().split("GMT")[0]);
        setCount(count + 1);
        createMyNote();

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
                    <h1>????????????</h1>
                    <textarea className='textarea' placeholder='??????????????????.....'
                        value={value} onChange={handleChange} />
                </label>
                <input className='MyMainNote-btn' type='submit' value='??????' />
            </form>
            <div className='MyMainNote-col'>
                {buildcolorItem}
            </div>
        </div>
    )

}
MyMainContent.propTypes = {
    MyNote: PropTypes.object.isRequired
};

export default MyMainContent;
