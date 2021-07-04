import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Navbar/nav';
import Header from '../Header/header';
import Root from '../Navbar/root';


const LawList = (props) => {

    const lawsProps = props.location.props
    const laws = lawsProps.laws.map(({ keyid, LawName, LawModifiedDate }) => {
        return <div key={keyid}>
            <table class="ui celled table">
                <tbody>
                    <tr>
                        <td data-label="Name">{LawName}</td>
                        <td data-label="Date">{LawModifiedDate}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    })
    return (
        <div>
            <NavBar />
            <Header />
            <div className="laws-list-frame">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th colspan="2" >位階
                            </th>
                        </tr>
                        <tr>
                            <th>法規名稱</th>
                            <th>修改日期</th>
                        </tr>
                    </thead>
                </table>
                {laws}
            </div>

            <Root />
        </div>
    )
}


export default LawList;