import React, {useContext} from 'react';
import './SearchItem.scss'
import {Link, useNavigate} from "react-router-dom";
import {SearchContext} from "../../context/SearchContext";
const SearchItem = ({item}) => {


    const {dates, options} = useContext(SearchContext)

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dayDifference(dates[0].endDate, dates[0].startDate);
    const navigate = useNavigate()
    return (
        <div

            className={'searchItem'}>
            <img src={item.photos[0]} alt="" className="siImg"/>
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance} от центра</span>
                <span className="siTaxi">Скидка 30% на такси от аэропорта</span>
                <span className="siSubTitle">3-х комн. аппартаменты с видом на горы</span>
                <span className="siFeatures">{item.desc}</span>
                <span className="siCancelOp">Бесплатная отмена</span>
                <span className="siCancelOpSub">You can cancel later, so lock in this great price today!</span>
            </div>
            <div className="siDetails">
                {item.rating && <div className="siRating">
                    <span>Превосходно</span>
                    <button>{item.rating}</button>
                </div>}
                <div className="siDetailText">
                    <span className="siPrice">{days * item.cheapestPrice * options?.room}<small style={{color: "grey"}}> KZT</small></span>
                    <span className="siTaxOp">Включая налоги и сборы</span>
                    <Link to={`/hotels/${item._id}`}><button
                        className={'siCheckButton'}>Показать цены </button></Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;