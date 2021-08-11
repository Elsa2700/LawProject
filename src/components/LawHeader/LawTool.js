import '../../style/LawInfo.css';
import React from 'react';
import PropTypes from "prop-types";



const LawTool = ({setFontSize}) => {

    return (
        <div className="tool-frame"  id='topIcon'>
            <div className="font-tool">
                <span>字體</span>
                <div className="ui buttons">
                    <button className="ui button" onClick={() => setFontSize('FontLarge')}>大</button>
                    <button className="ui button" onClick={() => setFontSize('FontMid')}>中</button>
                    <button className="ui button" onClick={() => setFontSize('FontSmall')}>小</button>
                    
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
LawTool.propTypes = {
    setFontSize: PropTypes.object.isRequired,
  };

export default LawTool;

