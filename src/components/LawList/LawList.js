import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/nav';
import Header from '../Header/header';
import Root from '../Navbar/root';
import { firestore } from '../../database/firebase-service';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";




const LawList = (props) => {
    const history = useHistory();
    const levelProps = props.location.props
    console.log(levelProps.level);

    //初始化
    const [list, setList] = useState([]);
    const [value, setValue] = useState('');
    const [page, setPage] = useState(1);
    const [num, setNum] = useState(0);

    //loading initial data
    useEffect(() => {
        const fetchData = async () => {
            // let itemlen = firestore.collection('lawData').where("LawLevel", "==", levelProps.level);
            // await itemlen.onSnapshot(function(querySnapshot) { 
            //     let lawnum = Math.ceil((querySnapshot.size/10))
            //     setNum(lawnum);
            // });

            let firstref = firestore.collection('lawData').limit(10).where("LawLevel", "==", levelProps.level).orderBy("LawCategory", 'desc')
            await firstref.onSnapshot(function (querySnapshot) {
                let data = [];
                querySnapshot.forEach((doc) => {
                    let lawdata = doc.data();
                    let lawdataid = Object.create(lawdata);
                    lawdataid.keyid = doc.id;
                    data.push(lawdataid);
                });
                setList(data);
            })
        };
        fetchData();
    }, []);
    //next button function
    const showNext = ({ item }) => {
        if (list.length === 0) {
            //use this to show hide buttons if there is no records
        } else {
            const fetchNextData = async () => {
                let firstref = firestore.collection('lawData').limit(10).where("LawLevel", "==", levelProps.level).orderBy("LawCategory", 'desc')
                await firstref
                    .startAfter(item.LawCategory)//we pass props item's first created timestamp to do start after you can change as per your wish
                    .onSnapshot(function (querySnapshot) {
                        const items = [];
                        querySnapshot.forEach(function (doc) {
                            items.push({ key: doc.id, ...doc.data() });
                        });
                        setList(items);
                        setPage(page + 1) //in case you like to show current page number you can use this
                        console.log(page, list)
                    })
            };
            fetchNextData();
        }
    }
    const showPrevious = ({ item }) => {
        const fetchPreviousData = async () => {
            let firstref = firestore.collection('lawData').limit(10).where("LawLevel", "==", levelProps.level).orderBy("LawCategory", 'desc')
            await firstref
                .endBefore(item.LawCategory) //this is important when we go back
                .limitToLast(10) //this is important when we go back
                .onSnapshot(function (querySnapshot) {
                    const items = [];
                    querySnapshot.forEach(function (doc) {
                        items.push({ key: doc.id, ...doc.data() });
                    });
                    setList(items);
                    setPage(page - 1)
                })
        };
        fetchPreviousData();

    }

    const handleClick = (val) => {
        console.log(val)
        setValue(val)
        
    }
    // { keyid, LawName, LawHistories, LawCategory, LawURL, LawArticles }
    const laws = list.map((
        { keyid, LawName, LawModifiedDate, LawHistories, LawCategory, LawURL, LawArticles }) => {
        //傳遞list資料

        return <div key={keyid}>
            <table class="ui celled table">
                <tbody>
                    <Link to={{
                        pathname:'/LawInfo',
                        state:{lawinfo:value}
                    }} onClick={() => handleClick( { keyid, LawName, LawHistories, LawCategory, LawURL, LawArticles })}>
                        <tr>
                            <td data-label="Name">{LawName}</td>
                            <td data-label="Date">{LawModifiedDate}</td>
                        </tr>
                    </Link>
                </tbody>
            </table>
        </div>
    })
    return (
        <div>
            <NavBar />
            <Header />
            <div className="page-btn">
                <button className="ui huge left labeled icon button" onClick={() => showPrevious({ item: list[0] })}>
                    <i className="left arrow icon"></i>
                    上一頁
                </button>
                <button className="ui huge right labeled icon button" onClick={() => showNext({ item: list[list.length - 1] })}>
                    <i className="right arrow icon"></i>
                    下一頁
                </button>
                <div className="page-info"><span className="now">第{page}頁</span>/<span className="all">共{num}頁</span></div>


            </div>

            <div className="laws-list-frame">
                <table className="ui table">
                    <thead>
                        <tr>
                            <th colspan="2" style={{ textAlign: 'start', paddingLeft: '100px', fontSize: '38px' }} >{levelProps.level}
                            </th>
                            <i className="grey huge balance scale icon"></i>
                        </tr>
                        <tr className="col-name">
                            <th>法規名稱</th>
                            <th>修改日期</th>
                        </tr>
                    </thead>
                </table>
                <tr>
                    {laws}
                </tr>

            </div>
            <Root />
        </div>
    )


};


export default LawList;