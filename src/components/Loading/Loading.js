import '../../style/member.css';
import React, { useEffect, useState} from 'react';


const Loading = () => {
    const [show, setshow] = useState('show-load');
    useEffect(() => {
        setTimeout(() => {
            setshow('hide-load')
            }, 2000)
    },[show])

    return(
        <div className={show}></div>
    )}
   

export default Loading;