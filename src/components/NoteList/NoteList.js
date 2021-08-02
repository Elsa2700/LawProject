import React, {useEffect, useState,useContext } from 'react';
import Context from '../../context';
import {firestore} from '../../database/firebase-service';

const NoteList = () => {
    const { user } = useContext(Context);
    const [userId, setuserId] = useState(user.uid);
    const [Item, setItem] = useState([]);

    useEffect(() =>{
        
        const fetchUserData = () =>{
            console.log(userId)
            firestore
                .collection('users')
                .where('user','==', userId)
                .get().then((documentSnapshots)=>{
                    const data = documentSnapshots.docs.map((doc) => ({ ...doc.data(), keyid: doc.id }))
                    console.log(data)
                    setItem(data);
                })
        }
        console.log(Item)
        fetchUserData();
    }, [userId]);
    
    const handleScroll = () => {
        console.log('下拉功能')
    }
    console.log(Item);
    const buildItems = Item.map((item) => {
        return(
            <div className={`item ${item.noteColor}`} key={item}>
                <div style={{fontWeight:'bolder'}}>{item.law.ArticleNo}</div>
                <div>{item.law.ArticleContent}</div>
                <div style={{color:'#035397'}}>{item.noteContent}</div>
                <i className="big grey trash alternate icon"></i>
            </div>
        )
    })
    console.log(buildItems)


    return (
        <div className='NoteList' onScroll={handleScroll()}>
            <div>{buildItems}</div>
        </div>
    )
}


export default NoteList;