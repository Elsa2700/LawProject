
import React from 'react';
import { BrowserRouter as Route, Link, Switch } from "react-router-dom";
import LawList from '../LawList/LawList';


class LawMenu extends React.Component {
    render() {
        return (
            <div className="laws-menu-frame">
                <Link to="/LawList?level=constitution">
                    <div className="law-menu">
                        <ul className="law-menu-text">
                            <li style={{ fontSize: '50px', color: 'black', marginBottom: "15px" }}>憲法</li>
                            <li>法規數量:9<span>筆</span></li>
                            <li>異動時間:<p>2021/1/22 上午 12:00:00</p></li>
                            <i className="grey big balance scale icon"></i>
                        </ul>
                    </div>
                </Link>

                <Link to="/LawList?level=law">
                    <div className="law-menu">
                        <ul className="law-menu-text">
                            <li style={{ fontSize: '50px', color: 'black', marginBottom: "15px" }}>法律</li>
                            <li>法規數量:1231<span>筆</span></li>
                            <li>異動時間:<p>2021/1/22 上午 12:00:00</p></li>
                            <i className="grey big balance scale icon"></i>
                        </ul>
                    </div>
                </Link>

                <Link to="/LawList?level=order">
                    <div className="law-menu">
                        <ul className="law-menu-text">
                            <li style={{ fontSize: '50px', color: 'black', marginBottom: "15px" }}>命令</li>
                            <li>法規數量:9298<span>筆</span></li>
                            <li>異動時間:<p>2021/1/22 上午 12:00:00</p></li>
                            <i className="grey big balance scale icon"></i>
                        </ul>
                    </div>
                </Link>
                <Switch>
                    <Route path="/LawList" component={LawList} />
                </Switch>

            </div >
        )

    }
}








export default LawMenu;

