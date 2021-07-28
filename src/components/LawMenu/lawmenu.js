
import React from 'react';
import { firestore } from '../../database/firebase-service'
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import LawList from '../LawList/LawList'


class LawMenu extends React.Component {
    render() {
        return (
            <div className="laws-menu-frame">
                <Link to='/LawList?level=constitution'>
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
                <Link to='/LawList?level=law'>
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

                <Link to='/LawList?level=order'>
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








export default LawMenu;

