import React from 'react';
import '../../style/LawInfo.css'


const LawHeader = (props) => {
    console.log(props.LawInfo)
    return (
        <div className="LawHeader-frame">
            <div>
                <header>法規名稱:
                <span className='LawMain-item'>{props.LawInfo.LawName}</span>
                </header>
            </div>
            <div>
                <header>修正日期:
                <span>{props.LawInfo.LawModifiedDate}</span>
                </header>
            </div>
            <div>
                <header>法規類別:
                <span>{props.LawInfo.LawCategory}</span>
                </header>
            </div>



        </div>)


}

export default LawHeader;