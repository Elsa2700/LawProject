
import React from 'react';
import '../../style/LawInfo.css'


const LawHeader = ({LawInfo}) => {
    return (
            <div className="LawHeader-frame">
                <div>
                    <header>法規名稱:
                        <span>{LawInfo.LawName}</span>
                    </header>
                </div>
                <div>
                    <header>修正日期:
                        <span>{LawInfo.LawModifiedDate}</span>
                    </header>
                </div>
                <div>
                    <header>法規類別:
                        <span>{LawInfo.LawCategory}</span>
                    </header>
                </div>
            </div>

    )

}

export default LawHeader;