
import '../../style/LawInfo.css';
// ES6 Imports
import * as Scroll from 'react-scroll';
import { Link } from 'react-router-dom';
import Scrollspy from 'react-scrollspy';
import ScrollIntoView from 'react-scroll-into-view';
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import LawTool from '../LawHeader/LawTool';

let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

const LawMain = ({LawInfo}) => {
    console.log('法條內容資訊',{LawInfo})
    const [fontSize, setFontSize] = useState('')

    const Chapter = LawInfo.LawArticles.map(({ keyid, ArticleType, ArticleContent, ArticleNo }) => {

        if (ArticleType == 'C') {
            const scrollLaw = (() => {
                let element = document.getElementById(ArticleContent.replace(/\s+/g, ''));
                element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
            })
            if (ArticleContent.search("章") == -1) {
                return (
                    <button key={keyid} onClick={scrollLaw} className="ui button section">{ArticleContent}</button>
                )
            }
            else {
                return (
                    <div>
                        <button key={keyid} onClick={scrollLaw} className="ui yellow basic button">{ArticleContent}</button>
                    </div>
                )
            }
        }
    })

    const Main = LawInfo.LawArticles.map(({  ArticleType, ArticleContent, ArticleNo }) => {

        if (ArticleType == 'C') {
            if (ArticleContent.search("章") == -1) {
                return (
                    <span className="LawMain-section" id={ArticleContent.replace(/\s+/g, '')}>{ArticleContent}</span>
                )
            }
            else {
                return (
                    <span className="LawMain-chapter" id={ArticleContent.replace(/\s+/g, '')}>{ArticleContent}</span>
                )
            }
        } else {
            //小: 3em 中:3.5em 大:4em
            return (
                <div>
                    <div className={`LawMain-item ${fontSize}`}>
                        <div>
                            <header >{ArticleNo}</header>
                            <p>{ArticleContent}</p>
                        </div>

                        <div>
                            <Link to={{
                                pathname: '/mynote',
                                state:{lawnote:{ArticleType, ArticleContent, ArticleNo}}
                            }}>
                                <i className="large gray bookmark icon"></i>

                            </Link>
                        </div>

                    </div>

                </div>
            )

        }
    })

    return (
        <div>
             <LawTool setFontSize={setFontSize} />
            <div id='topIcon' className="lawchapter-frame">
                {Chapter}
            </div>

            <div className="ui horizontal divider"><i className="massive chess knight icon"></i></div>
            <div className="LawMain-frame">
                {Main}
            </div>
            <ScrollIntoView selector="#topIcon" className='arrowIcon'>
                <i className="arrow massive alternate circle up icon" ></i>
            </ScrollIntoView>

        </div>
    )

}


export default LawMain;