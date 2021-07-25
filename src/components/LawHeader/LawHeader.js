
import React from 'react';
import '../../style/LawInfo.css'


const LawHeader = (props) => {
    console.log(props)
    return (
            <div className="LawHeader-frame">
                <div>
                    <header>法規名稱:
                        <span>{props.LawName}</span>
                    </header>
                </div>
                <div>
                    <header>修正日期:
                        <span>{props.LawModifiedDate}</span>
                    </header>
                </div>
                <div>
                    <header>法規類別:
                        <span>{props.LawCategory}</span>
                    </header>
                </div>
            </div>

    )

}

export default LawHeader;