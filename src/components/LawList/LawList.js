import React, { useEffect, useState, Fragment } from 'react';
import NavBar from '../Navbar/nav';
import Root from '../Navbar/root';
import { firestore } from '../../database/firebase-service';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import '../../style/LawList.css';
import Loading from '../Loading/Loading';


const LawList = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const query = new URLSearchParams(useLocation().search);
    const level = query.get('level');
    const keywordsearch = query.get('keyword');
    let levelcz = '';
    let keyword = '';

    if (!keywordsearch) {
        if (level === 'constitution') {
            levelcz = '憲法';
        }
        else if (level === 'law') {
            levelcz = '法律';
        } else {
            levelcz = '命令';
        }
    } else {
        keyword = keywordsearch;
    }


    useEffect(() => {

        const fetchLevelData = async () => {
            await firestore
                .collection('lawData')
                .where('LawLevel', '==', levelcz)
                .orderBy('LawCategory', 'desc')
                .limit(10)
                .onSnapshot(function (querySnapshot) {
                    var items = [];
                    querySnapshot.forEach(function (doc) {
                        items.push({ key: doc.id, ...doc.data() });
                    });
                    setList(items);
                })
        };

        const fetchSearchData = async () => {
            await firestore
                .collection('lawData')
                .where('wordDB', 'array-contains', keyword)
                .orderBy('LawName', 'desc')
                .limit(10)
                .onSnapshot(function (querySnapshot) {
                    var items = [];
                    querySnapshot.forEach(function (doc) {
                        items.push({ key: doc.id, ...doc.data() });
                    });
                    setList(items);
                })
        };

        (keyword === '' ? fetchLevelData() : fetchSearchData())
    }, []);




    const showNext = ({ item }) => {
        if (list.length < 10) {
            return
        } else {
            const fetchLevelNextData = async () => {
                await firestore
                    .collection('lawData')
                    .where('LawLevel', '==', levelcz)
                    .orderBy('LawCategory', 'desc')
                    .startAfter(item.LawCategory)
                    .limit(10)
                    .onSnapshot(function (querySnapshot) {
                        const items = [];
                        querySnapshot.forEach(function (doc) {
                            items.push({ key: doc.id, ...doc.data() });
                        })
                        setList(items);
                        setPage(page + 1);
                    });

            };

            const fetchSearchNextData = async () => {
                await firestore
                    .collection('lawData')
                    .where('wordDB', 'array-contains', keyword)
                    .orderBy('LawName', 'desc')
                    .startAfter(item.LawName)
                    .limit(10)
                    .onSnapshot(function (querySnapshot) {
                        const items = [];
                        querySnapshot.forEach(function (doc) {
                            items.push({ key: doc.id, ...doc.data() });
                        })
                        setList(items);
                        setPage(page + 1);
                    });

            };

            (keyword === '' ? fetchLevelNextData() : fetchSearchNextData())
        }
    };


    const showPrevious = ({ item }) => {
        if (page === 0) {
            return
        } else {
            const fetchLevelPreviousData = async () => {
                await firestore
                    .collection('lawData')
                    .where('LawLevel', '==', levelcz)
                    .orderBy('LawCategory', 'desc')
                    .endBefore(item.LawCategory)
                    .limitToLast(10)
                    .onSnapshot(function (querySnapshot) {
                        const items = [];
                        querySnapshot.forEach(function (doc) {
                            items.push({ key: doc.id, ...doc.data() });
                        });
                        setList(items);
                        setPage(page - 1);
                    })
            };

            const fetchSearchPreviousData = async () => {
                await firestore
                    .collection('lawData')
                    .where('wordDB', 'array-contains', keyword)
                    .orderBy('LawName', 'desc')
                    .endBefore(item.LawName)
                    .limitToLast(10)
                    .onSnapshot(function (querySnapshot) {
                        const items = [];
                        querySnapshot.forEach(function (doc) {
                            items.push({ key: doc.id, ...doc.data() });
                        });
                        setList(items);
                        setPage(page - 1);
                    })
            };
            (keyword === '' ? fetchLevelPreviousData() : fetchSearchPreviousData())
        }

    };



    const laws = list.map(({ key, LawName, LawModifiedDate, LawHistories, LawCategory, LawURL, LawArticles }) => {
        return (
            <>
                <tr>
                    <Link className='LawList-href' to={{
                        pathname: '/LawInfo',
                        state: { lawinfo: { key, LawName, LawModifiedDate, LawHistories, LawCategory, LawURL, LawArticles } }
                    }}>
                        <td colSpan="2">
                            <i className="large book icon" />
                        </td>
                    </Link>
                    <td colSpan="2">{LawName}</td>
                    <td colSpan="1">{LawCategory}</td>
                    <td colSpan="2">{LawModifiedDate}</td>
                </tr>
            </>
        )
    })

    const TableList = () => {
        return (
            <>
                <i className="grey balance scale icon"></i>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th colSpan="6" className='table-header'>{levelcz}{keyword}</th>
                        </tr>
                        <tr className='table-title'>
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
                {list.length === 0 ? <Loading /> : ''}
                <div className="page-btn">

                    <button className='ui huge left labeled icon button' onClick={() => showPrevious({ item: list[0] })}>
                        <i className="left arrow icon"></i>
                        上一頁
                    </button>

                    <button className='ui huge right labeled icon button' onClick={() => showNext({ item: list[list.length - 1] })}>
                        <i className="right arrow icon"></i>
                        下一頁
                    </button>
                    <div className="page-info">
                        <span className="now">第{page + 1}頁</span>
                    </div>
                </div>
                <div className="laws-list-frame">
                    <TableList />
                </div>

                <Root />
            </div>
        </>
    )
};
export default LawList;