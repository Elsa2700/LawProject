import React from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../database/firebase-service'
import { withRouter } from 'react-router-dom'


class LawMenu extends React.Component {
    state = { laws: [] };
    lawlevel = {
        constitution : '憲法',
        law:'法律',
        order:'命令'
    }
    componentOnclick(level) {
        let docref = firestore.collection('lawData').limit(20).where("LawLevel", "==", level)
        let data = [];
        docref.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let lawdata = doc.data();
                let lawdataid = Object.create(lawdata);
                lawdataid.keyid = doc.id;
                data.push(lawdataid);
            });
            this.setState({ laws: data });
            console.log(this.state.laws);
            this.props.history.push({pathname:'/LawList', props: { laws: this.state.laws }});
            
        })
    }
    onLawlevelClick=(e)=>{
        e.preventDefault();
        console.log(e.currentTarget.getAttribute("val"))
        console.log(this.lawlevel.constitution)
        let level = e.currentTarget.getAttribute("val")
        this.componentOnclick(level)
    }

    render() {
        return (
            <div className="laws-menu-frame">
                <Link to='/LawList' onClick={this.onLawlevelClick} val="憲法">
                    <div className="law-menu">
                        <ul className="law-menu-text">
                            <li style={{ fontSize: '50px', color:'black',marginBottom:"15px" }}>憲法</li>
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
                            <li style={{ fontSize: '50px', color:'black',marginBottom:"15px" }}>法律</li>
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
                            <li style={{ fontSize: '50px', color:'black',marginBottom:"15px" }}>命令</li>
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