import React, { useEffect, useState, Fragment } from 'react';
import NavBar from '../Navbar/nav';
import Root from '../Navbar/root';
import { firestore } from '../../database/firebase-service';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import '../../style/LawList.css';
import Loading from '../Loading/Loading';



const LawList = () => {

    //初始化
    const [list, setList] = useState([]);
    const [prevFirstItem, setPrevFirstItem] = useState([]);
    const [lastVisible, setlastVisible] = useState([]);
    const [page, setPage] = useState(0);
    const query = new URLSearchParams(useLocation().search);
    const level = query.get('level');
    const keywordsearch = query.get('keyword');
    let levelcz = '';
    let keyword = '';

    if (!keywordsearch) {
        if (level === 'constitution') {
            levelcz = '憲法'
        }
        else if (level === 'law') {
            levelcz = '法律'
        } else {
            levelcz = '命令'
        }
    } else {
        keyword = keywordsearch
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
                    setList(data);
                });
        };


        //關鍵字搜尋=====================
        const fetchSearchData = () => {
            firestore
                .collection('lawData')
                .where('wordDB', 'array-contains', keyword)
                .orderBy('LawName', 'desc')
                .limit(10)
                .get().then((documentSnapshots) => {
                    const data = documentSnapshots.docs.map((doc) => ({
                         ...doc.data(), keyid: doc.id 
                        }));
                    
                    setList(data);
                    setlastVisible(lastVisible);

                });
        };
       


        if (keyword === '') {
            fetchLevelData();
            return { num: false }
        }
        else {
            fetchSearchData();
            return { num: true }
        }
    }, []);

    //next button function
    const fetchLevelNextData = (lastVisible) => {
        prevFirstItem[page] = list[0]
        setPrevFirstItem(prevFirstItem)
        firestore
            .collection('lawData')
            .limit(10)
            .where('LawLevel', '==', levelcz)
            .orderBy('LawCategory', 'desc')
            .startAfter(lastVisible.LawCategory)
            .get().then((documentSnapshots) => {
                const items = documentSnapshots.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
                setList(items);
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
    const fetchSearchNextData = (lastVisible) => {
        prevFirstItem[page] = list[0];
        setPrevFirstItem(prevFirstItem);
        firestore
            .collection('lawData')
            .where('wordDB', 'array-contains', keyword)
            .orderBy('LawName', 'desc')
            .startAfter(lastVisible.LawCategory)
            .limit(10)
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
            return 
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
            fetchLevelPreviousData(item);
        } else {
            fetchSearchPreviousData(item);
        }
    };



    const laws = list.map(({ keyid, LawName, LawModifiedDate, LawHistories, LawCategory, LawURL, LawArticles }) => {
        return (
            <Fragment key={keyid}>
                <tr>
                    <Link className='LawList-href' to={{
                        pathname: '/LawInfo',
                        state: { lawinfo: { keyid, LawName, LawModifiedDate, LawHistories, LawCategory, LawURL, LawArticles } }
                    }}>
                        <td colSpan="2">
                            <i className="large book icon"></i>
                        </td>
                    </Link>
                    <td colSpan="2">{LawName}</td>
                    <td colSpan="1">{LawCategory}</td>
                    <td colSpan="2">{LawModifiedDate}</td>

                </tr>

            </Fragment>




        )
    })

    const TableList = () => {
        return (
            <>
                <i className="grey huge balance scale icon"></i>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th colSpan="6" style={{ textAlign: 'start', paddingLeft: '100px', fontSize: '38px' }} >{levelcz}{keyword}
                            </th>
                        </tr>
                        <tr className='table-title' style={{ backgroundColor: 'rgba(197, 227, 225, 0.24)', fontSize: '10px' }}>
                            <td colSpan="2" >查詢</td>
                            <td colSpan="1" >法規名稱</td>
                            <td colSpan="1">類別</td>
                            <td colSpan="2">修改日期</td>
                        </tr>
                    </thead>
                    {laws}
                </table>
            </>
        )
    }

    return (
        <>
            <div>
                <NavBar />
                {list.length == 0 ? <Loading /> : ''}
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

                <Fragment>
                    <div className="laws-list-frame">
                        <div>
                            {list.length==0 ? <NoData /> : <TableList />}
                        </div>
                    </div>
                </Fragment >

                <Root />
            </div>
        </>
    )
};
export default LawList;