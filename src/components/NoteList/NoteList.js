import React, { useEffect, useState, useContext } from 'react';
import Context from '../../context';
import { firestore } from '../../database/firebase-service';
import { Link } from 'react-router-dom';
import NoteMain from '../NoteMain/NoteMain';

const NoteList = ({parentcallback}) => {
    const { user } = useContext(Context);
    const [Item, setItem] = useState([]);
    const [openBox, setOpenBox] =useState(false);

    useEffect(() => {
        const fetchUserData = () => {
            firestore
                .collection('users')
                .where('user', '==', user.uid)
                .orderBy('order', 'desc')
                .get().then((documentSnapshots) => {
                    const data = documentSnapshots.docs.map((doc) => ({
                        ...doc.data(), keyid: doc.id
                    }))
                    setItem(data);
                })
        }
        if (user.uid) {
            fetchUserData();
        }
    }, [user.uid]);

    const deleteMyNote = (doc) => {
        firestore
            .collection('users').doc(doc).delete()
            .then(() => {
                console.log("Document successfully deleted!");
                window.location.reload();
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    const handleScroll = () => {
        console.log('下拉功能')
    }

    const handleClick = (ItemKey) => {
        console.log(ItemKey);
        deleteMyNote(ItemKey);
    }

    const buildItems = Item.map((item) => {
        console.log(item)
        return (
            <div className='note-list-frame' 
            onClick={()=>{setOpenBox(!openBox);parentcallback(openBox,Item,item)}} Item={Item}>

                <div className={`item ${item.noteColor}`} key={item}>
                    <div className='notelist-frame'>
                        <div style={{ fontWeight: 'bolder', color: '#716F81' }}>{item.law.ArticleNo}</div>
                        <div style={{ color: '#716F81' }}>{item.law.ArticleContent}</div>
                        <hr />
                        <div style={{ color: '#716F81' }}>{item.noteContent}</div>
                        <div className='note-time'>{item.order}</div>
                    </div>

                    <i onClick={() => { handleClick(item.keyid) }} className="grey trash alternate icon"></i>
                </div>
            </div>
        )
    })



    return (
        <div className='NoteList' onScroll={handleScroll()}>
            <div>{buildItems}</div>
        </div>
    )
}


export default NoteList;