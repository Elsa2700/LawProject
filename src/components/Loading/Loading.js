import '../../style/member.css';
import React, { useEffect, useState } from 'react';


const Loading = () => {
    const [show, setShow] = useState('show-load');
    useEffect(() => {
        setTimeout(() => {
            setShow('hide-load')
        }, 2000)
    }, [show])

    return (
        <div className={show} />
    )
}


export default Loading;