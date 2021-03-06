
import '../../style/LawInfo.css';
import { Link } from 'react-router-dom';
import ScrollIntoView from 'react-scroll-into-view';
import React, { useState } from 'react';
import LawTool from '../LawHeader/LawTool';
import PropTypes from "prop-types";



const LawMain = ({ LawInfo }) => {
    const [fontSize, setFontSize] = useState('');
    const lawKey = LawInfo.key;


    const Chapter = LawInfo.LawArticles.map(({ ArticleType, ArticleContent }) => {
        if (ArticleType == 'C') {
            const scrollLaw = (() => {
                let element = document.getElementById(ArticleContent.replace(/\s+/g, ''));
                element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
            })
            if (ArticleContent.search("章") == -1) {
                return (
                    <button onClick={scrollLaw} className="ui button section">{ArticleContent}</button>
                )
            }
            else {
                return (
                    <div>
                        <button onClick={scrollLaw} className="ui yellow basic button">{ArticleContent}</button>
                    </div>
                )
            }
        }
    })

    const Main = LawInfo.LawArticles.map(({ ArticleType, ArticleContent, ArticleNo }) => {
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
                    <div className={`LawMain-item ${fontSize}`}>
                        <div>
                            <header >{ArticleNo}</header>
                            <p>{ArticleContent}</p>
                        </div>
                        <div id='bookmark'>
                            <Link to={{
                                pathname: '/mynote',
                                state: { lawnote: { lawKey, ArticleType, ArticleContent, ArticleNo } }
                            }}>
                                <i className="large gray bookmark icon"></i>

                            </Link>
                            <div className="add-text">加入我的蒐藏</div>
                        </div>
                    </div>
                </div>
            )
        }
    })

    return (
        <div>
            <LawTool setFontSize={setFontSize} />
            <div className="lawchapter-frame">
                {Chapter}
            </div>
            <div className="ui horizontal divider"><i className="massive chess knight icon"></i></div>
            <div className="LawMain-frame">
                {Main}
            </div>
            <ScrollIntoView selector="#topIcon" smooth='true' alignToTop='true' className='arrowIcon'>
                <i className="arrow massive alternate circle up icon" ></i>
            </ScrollIntoView>
        </div>
    )
}


LawMain.propTypes = {
    LawInfo: PropTypes.object.isRequired,
};
export default LawMain;