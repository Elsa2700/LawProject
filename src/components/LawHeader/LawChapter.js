import React from 'react';
import '../../style/LawInfo.css'

class LawChapter extends React.Component{
    render(){
        return(
            <div className="lawchapter-frame">
                <button class="ui yellow button">第一章 總綱</button>
                <button class="ui olive button">第一節</button>

            </div>
        )
    }
}

export default LawChapter;