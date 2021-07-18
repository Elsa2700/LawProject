
import React, { useEffect, useState, Fragment } from 'react';
import NavBar from '../Navbar/nav';
import Header from '../Header/header';
import Root from '../Navbar/root';
import { firestore } from '../../database/firebase-service';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import '../../style/LawList.css'


const LawList = (props) => {

    //初始化
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [num, setNum] = useState(0);

    const location = useLocation();

    const query = new URLSearchParams(useLocation().search);
    console.log(useLocation().search)
    const level = query.get('level')
    let levelcz = ''
    let keyword = ''

    if (useLocation().search == '') {
        keyword = props.location.state.keyword
    } else {
        if (level === 'constitution') {
            console.log("憲法")
            levelcz = '憲法'
        }
        else if (level === 'law') {
            levelcz = '法律'
        } else {
            levelcz = '命令'
        }
    }

    //loading initial data
    useEffect(() => {
        const fetchLevelData = async () => {
            await firestore
                .collection('lawData')
                .limit(10)
                .where('LawLevel', '==', levelcz)
                .orderBy('LawCategory', 'desc')
                .onSnapshot((querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), keyid: doc.id }))
                    setList(data)
                });
        };

        const fetchSearchData = async () => {
            await firestore
                .collection('lawData')
                .limit(10)
                .orderBy('LawName')
                .startAt(keyword)
                .endAt(keyword + '\uf8ff')
                .onSnapshot((querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), keyid: doc.id }))
                    setList(data)
                });
        };
        if (keyword == '') {
            console.log(levelcz);
            fetchLevelData();
        }
        else {
            console.log(keyword);
            fetchSearchData();
        }
    }, []);

    //next button function
    const fetchLevelNextData = async (item) => {
        await firestore
            .collection('lawData')
            .limit(10)
            .where('LawLevel', '==', levelcz)
            .orderBy('LawCategory', 'desc')
            .startAfter(item.LawCategory) //we pass props item's first created timestamp to do start after you can change as per your wish
            .onSnapshot((querySnapshot) => {
                const items = querySnapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
                setList(items);
                setPage(page + 1); //in case you like to show current page number you can use this

            });
    };


    const fetchLevelPreviousData = async (item) => {
        await firestore
            .collection('lawData')
            .limitToLast(10)
            .where('LawLevel', '==', levelcz)
            .orderBy('LawCategory', 'desc')
            .endBefore(item.LawCategory) //we pass props item's first created timestamp to do start after you can change as per your wish
            .onSnapshot((querySnapshot) => {
                const items = querySnapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
                setList(items);
                setPage(page - 1); //in case you like to show current page number you can use this

            });
    };
    //next button function
    const fetchSearchNextData = async (item) => {
        await firestore
            .collection('lawData')
            .orderBy('LawName')
            .startAt(keyword)
            .endAt(keyword + '\uf8ff')
            .limit(10)
            .startAfter(item.LawCategory) //we pass props item's first created timestamp to do start after you can change as per your wish
            .onSnapshot((querySnapshot) => {
                const items = querySnapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
                setList(items);
                setPage(page + 1); //in case you like to show current page number you can use this
            });
    };


    const fetchSearchPreviousData = async (item) => {
        await firestore
            .collection('lawData')
            .orderBy('LawName')
            .startAt(keyword)
            .endAt(keyword + '\uf8ff')
            .limitToLast(10)
            .endBefore(item.LawCategory) //we pass props item's first created timestamp to do start after you can change as per your wish
            .onSnapshot((querySnapshot) => {
                const items = querySnapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
                setList(items);
                setPage(page - 1); //in case you like to show current page number you can use this
            });
    };



    const showNext = ({ item }) => {
        if (keyword == '') {
            fetchLevelNextData(item);
        } else {

            fetchSearchNextData(item);

        }
    };

    const showPrevious = ({ item }) => {
        if (keyword == '') {
            fetchLevelPreviousData(item);

        } else {
            fetchSearchPreviousData(item);
        }
    };

    const laws = list.map(({ keyid, LawName, LawModifiedDate, LawHistories, LawCategory, LawURL, LawArticles }) => {
        return (
            <tbody>
                <Fragment key={keyid}>
                    <Link to={{
                        pathname: '/LawInfo',
                        state: { lawinfo: { keyid, LawName, LawModifiedDate, LawHistories, LawCategory, LawURL, LawArticles } }
                    }}>
                        <tr>
                            <td data-label="Name">{LawName}</td>
                            <td data-label="Date">{LawModifiedDate}</td>
                        </tr>
                    </Link>
                </Fragment >
            </tbody>
        )
    })
    return (
        <div>
            <NavBar />
            <div className="page-btn">
                <button className='ui huge left labeled icon button' onClick={() => showPrevious({ item: list[0] })}>
                    <i className="left arrow icon"></i>
                    上一頁
                </button>
                <button className='ui huge right labeled icon button' onClick={() => showNext({ item: list[list.length - 1] })}>
                    <i className="right arrow icon"></i>
                    下一頁
                </button>
                <div className="page-info"><span className="now">第{page}頁</span></div>
            </div>
            <div className="laws-list-frame">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th colSpan="2" style={{ textAlign: 'start', paddingLeft: '100px', fontSize: '38px' }} >{levelcz}
                            </th>
                            <i className="grey huge balance scale icon"></i>
                        </tr>
                        <th colSpan="2" style={{ backgroundColor: 'rgba(197, 227, 225, 0.24)', fontSize: '10px' }}>
                            <td>法規名稱</td>
                            <td>修改日期</td>
                        </th>
                    </thead>
                    {laws}
                </table>


            </div>
            <Root />
        </div>
    )


};



export default LawList;