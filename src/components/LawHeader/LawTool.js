
import React from 'react';
import '../../style/LawInfo.css';
import { Link } from 'react-router-dom';



const LawTool = () => {

    return (
        <div className="tool-frame">
            <div className="font-tool">
                <span>字體</span>
                <div className="ui buttons">
                    <Link to='/LawInfo?size=FontLarge' >
                        <button className="ui button">大</button>
                    </Link>
                    <Link><button className="ui button">中</button></Link>
                    <Link><button className="ui button">小</button></Link>
                    
                </div>
            </div>
            <div className="read-tool">
                <span>朗讀</span>
                <div className="ui icon buttons">
                    <button className="huge ui button active">
                        <i className="play icon"></i>
                    </button>
                    <button className="huge ui button">
                        <i className="pause icon"></i>
                    </button>
                </div>

            </div>
        </div>
    )

}

export default LawTool;

