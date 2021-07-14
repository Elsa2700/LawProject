import React from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../database/firebase-service'
import { withRouter } from 'react-router-dom'




class LawMenu extends React.Component {
    state = {level: '' };

    onLawlevelClick = async (e) => {
        e.preventDefault();
        let level = await e.currentTarget.getAttribute("val")
        this.setState({ level: level });  
        this.props.history.push({pathname:'/LawList', props: { level: this.state.level }}); 

    }

    render() {
        return (
            <div className="laws-menu-frame">
                <Link to='/LawList' onClick={this.onLawlevelClick} val="憲法">
                    <div className="law-menu">
                        <ul className="law-menu-text">
                            <li style={{ fontSize: '50px', color: 'black', marginBottom: "15px" }}>憲法</li>
                            <li>法規數量:342<span>筆</span></li>
                            <li>點擊次數:0<span>次</span></li>
                            <li>異動時間:<p>2021/1/22 上午 12:00:00</p></li>
                            <i className="grey big balance scale icon"></i>
                        </ul>
                    </div>
                </Link>
                <Link to='/LawList' onClick={this.onLawlevelClick} val="法律">
                    <div className="law-menu">
                        <ul className="law-menu-text">
                            <li style={{ fontSize: '50px', color: 'black', marginBottom: "15px" }}>法律</li>
                            <li>法規數量:1230<span>筆</span></li>
                            <li>點擊次數:0<span>次</span></li>
                            <li>異動時間:<p>2021/1/22 上午 12:00:00</p></li>
                            <i className="grey big balance scale icon"></i>
                        </ul>
                    </div>
                </Link>

                <Link to='/LawList' onClick={this.onLawlevelClick} val="命令">
                    <div className="law-menu">
                        <ul className="law-menu-text">
                            <li style={{ fontSize: '50px', color: 'black', marginBottom: "15px" }}>命令</li>
                            <li>法規數量:4032<span>筆</span></li>
                            <li>點擊次數:0<span>次</span></li>
                            <li>異動時間:<p>2021/1/22 上午 12:00:00</p></li>
                            <i className="grey big balance scale icon"></i>
                        </ul>
                    </div>
                </Link>
            </div >
        )
    }
}


export default withRouter(LawMenu);