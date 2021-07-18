
import React from 'react';
import '../../style/LawInfo.css';
// ES6 Imports
import * as Scroll from 'react-scroll';
import { Link } from 'react-router-dom';
import Scrollspy from 'react-scrollspy';
import ScrollIntoView from 'react-scroll-into-view';




// Or Access Link,Element,etc as follows


let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;




const LawMain = (props) => {


    const Chapter = props.LawInfo.LawArticles.map(({ keyid, ArticleType, ArticleContent, ArticleNo }) => {

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

    const Main = props.LawInfo.LawArticles.map(({ ArticleType, ArticleContent, ArticleNo }) => {

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
            return (
                <div>
                    <div className="LawMain-item">
                        <div>
                            <header>{ArticleNo}</header>
                            <p>{ArticleContent}</p>
                        </div>

                        <div>
                            <Link to={{
                                pathname: '/mynote'
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
            <div id='topIcon' className="lawchapter-frame">
                {Chapter}
            </div>

            <div class="ui horizontal divider"><i class="massive chess knight icon"></i></div>
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