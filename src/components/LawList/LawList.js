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
    const [showResults, setShowResults] = React.useState(false)
    const [prevFirstItem, setPrevFirstItem] = useState([]);
    const [lastVisible, setlastVisible] = useState([]);
    const [page, setPage] = useState(0);
    const [num, setNum] = useState(1);
    const query = new URLSearchParams(useLocation().search);
    const level = query.get('level')
    let levelcz = ''
    let keyword = ''
    if (useLocation().search == '') { //querystring
        keyword = props.location.state.keyword
    } else {
        if (level === 'constitution') {
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
        const fetchLevelData = () => {
            firestore
                .collection('lawData')
                .limit(10)
                .where('LawLevel', '==', levelcz)
                .orderBy('LawCategory', 'desc')
                .get().then((documentSnapshots) => {
                    const data = documentSnapshots.docs.map((doc) => ({ ...doc.data(), keyid: doc.id }))
                    setList(data)
                    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
                    console.log("last", lastVisible);
                    console.log("items", data);
                });
        };

        //關鍵字搜尋=====================
        const fetchSearchData = () => {
            firestore
                .collection('lawData')
                .limit(10)
                .where('wordDB', 'array-contains', keyword)
                .get().then((documentSnapshots) => {
                    const data = documentSnapshots.docs.map((doc) => ({ ...doc.data(), keyid: doc.id }))
                    setList(data)
                    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
                    console.log("last", lastVisible);
                    setNum(documentSnapshots.size);
                    console.log(documentSnapshots.size)
                });
        };

        if (keyword === '') {
            console.log(levelcz);
            fetchLevelData();
            return { num: false }
        }
        else {
            console.log(keyword);
            fetchSearchData();
            return { num: true }
        }
    }, []);


    //next button function
    const fetchLevelNextData = (lastVisible) => {
        prevFirstItem[page] = list[0]
        setPrevFirstItem(prevFirstItem)
        console.log('lastVisible', lastVisible);
        // console.log('item.LawCategory',item.LawCategory);
        firestore
            .collection('lawData')
            .limit(10)
            .where('LawLevel', '==', levelcz)
            .orderBy('LawCategory', 'desc')
            .startAfter(lastVisible.LawCategory)
            .get().then((documentSnapshots) => {
                const items = documentSnapshots.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
                setList(items);
                const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
                console.log("last", lastVisible);
                console.log("items", items);
                setPage(page + 1);
            });
    };
    const fetchLevelPreviousData = (lastVisible) => {
        firestore
            .collection('lawData')
            .where('LawLevel', '==', levelcz)
            .orderBy('LawCategory', 'desc')
            .startAt(lastVisible.LawCategory)
            .limit(10)
            .get().then((documentSnapshots) => {
                const items = documentSnapshots.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
                setList(items);
                setPage(page - 1);
            });
    };

    //關鍵字搜尋=====================
    //next button function
    const fetchSearchNextData = (lastVisible) => {
        prevFirstItem[page] = list[0]
        setPrevFirstItem(prevFirstItem)
        console.log('lastVisible', lastVisible);
        firestore
            .collection('lawData')
            .where('wordDB', 'array-contains', keyword)
            .limit(10)
            .orderBy('LawCategory', 'desc')
            .startAfter(lastVisible.LawCategory)
            .get().then((documentSnapshots) => {
                const items = documentSnapshots.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
                setList(items);
                setPage(page + 1);
            });
    };
    const fetchSearchPreviousData = (lastVisible) => {
        firestore
            .collection('lawData')
            .where('wordDB', 'array-contains', keyword)
            .limit(10)
            .orderBy('LawCategory', 'desc')
            .startAt(lastVisible.LawCategory)
            .get().then((documentSnapshots) => {
                const items = documentSnapshots.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
                setList(items);
                setPage(page - 1);
            });
    };

    const NoData = () => {
        return (
            <div className="nodata">
                <div className='nodataimg'></div>
            </div>
        )
    }



    //上下頁
    const ShowNext = (item) => {
        if (!item) {
            return (setShowResults(true))
        }

        if (keyword === '') {
            fetchLevelNextData(item);
        } else {
            fetchSearchNextData(item);
        }
    };
    const showPrevious = (item) => {
        if (!item) {
            return
        }
        if (keyword === '') {
            setShowResults(false)
            fetchLevelPreviousData(item);
        } else {
            setShowResults(false)
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
                            <td data-label="Category">{LawCategory}</td>
                            <td data-label="Date">{LawModifiedDate}</td>
                        </tr>
                    </Link>
                </Fragment >
            </tbody>
        )
    })

    const PageNum = () => {
        return (
            <span className='pageNum'>/共{num}筆搜尋結果</span>
        )

    }

    return (
        <div>
            <NavBar />
            <div className="page-btn">
                <button className='ui huge left labeled icon button' onClick={() => showPrevious(prevFirstItem[page - 1])}>
                    <i className="left arrow icon"></i>
                    上一頁
                </button>
                <button className='ui huge right labeled icon button' onClick={() => ShowNext(list[list.length - 1])}>
                    <i className="right arrow icon"></i>
                    下一頁
                </button>
                <div className="page-info"><span className="now">第{page + 1}頁</span></div>
            </div>
            <div className="laws-list-frame">
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th colSpan="2" style={{ textAlign: 'start', paddingLeft: '100px', fontSize: '38px' }} >{levelcz}{keyword}
                            </th>
                            <i className="grey huge balance scale icon"></i>
                        </tr>
                        <th colSpan="2" style={{ backgroundColor: 'rgba(197, 227, 225, 0.24)', fontSize: '10px' }}>
                            <td>法規名稱</td>
                            <td>類別</td>
                            <td>修改日期</td>
                        </th>
                    </thead>
                    {laws}
                </table>
                <div>{showResults ? <NoData /> : null}</div>
            </div>
            <Root />
        </div>
    )
};
export default LawList;