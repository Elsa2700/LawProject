import React, { useEffect, useState, Fragment } from 'react';
import NavBar from '../Navbar/nav';
import Header from '../Header/header';
import Root from '../Navbar/root';
import { firestore } from '../../database/firebase-service';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";



const LawList = () => {
    const query = new URLSearchParams(useLocation().search);
    const level = query.get('level')
    let levelcz = ''

    if (level === 'constitution') {
        console.log("憲法")
        levelcz = '憲法'
    }
    else if (level === 'law') {
        levelcz = '法律'
    } else {
        levelcz = '命令'
    }


    //初始化
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [num, setNum] = useState(0);
    //loading initial data
 //loading initial data
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);
    //next button function
    const fetchNextData = async (item) => {
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
      const showNext = ({ item }) => {
        if (list.length === 0) {
          //use this to show hide buttons if there is no records
        } else {
          fetchNextData(item);
        }
      };

      const fetchPreviousData = async (item) => {
        await firestore
          .collection('lawData')
          .limit(10)
          .where('LawLevel', '==', levelcz)
          .orderBy('LawCategory', 'desc')
          .endBefore(item.LawCategory) //we pass props item's first created timestamp to do start after you can change as per your wish
          .onSnapshot((querySnapshot) => {
            const items = querySnapshot.docs.map((doc) => ({ key: doc.id, ...doc.data() }));
            setList(items);
            setPage(page - 1); //in case you like to show current page number you can use this
          });
      };
      const showPrevious = ({ item }) => {
        if (list.length === 0) {
            console.log(0)
            
        } else {
            fetchPreviousData(item);
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
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th colSpan="2" style={{ textAlign: 'start', paddingLeft: '100px', fontSize: '38px' }} >{levelcz}
                            </th>
                            <i className="grey huge balance scale icon"></i>
                        </tr>
                        <th colSpan="2" style={{backgroundColor:'rgba(197, 227, 225, 0.24)',fontSize:'10px'}}>
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