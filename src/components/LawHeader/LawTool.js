import React from 'react';
import '../../style/LawInfo.css'

class LawTool extends React.Component {
    render() {
        return (
            <div className="tool-frame">
                <div className="font-tool">
                    <span>字體</span>
                    <div className="ui buttons">
                        <button className="ui button">大</button>
                        <button className="ui button">中</button>
                        <button className="ui button">小</button>
                    </div>
                </div>
                <div className="read-tool">
                    <span>朗讀</span>
                    <div className="ui icon buttons">
                        <button class="huge ui button active">
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
}

export default LawTool;
