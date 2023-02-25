import React from 'react';
import './FeaturedProperties.scss'
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
    const { data, loading} = useFetch("/hotels?featured=true&limit=5")
    return (
        <div className={'fp'}>


            {loading ?
                ("Loading, please wait ") : (
                    <>
                        {data.map( (item) => (
                            <div
                                key={item._id}
                                className="fpItem">
                                <img
                                    className={'fpImg'}
                                    src={item?.photos[0]} alt=""/>
                                <span className="fpName">{item.name}</span>
                                <span className="fpCity">{item.city}</span>
                                <span className="fpPrice">От <span className={'fpprice'}>{item.cheapestPrice} KZT</span></span>
                                {item.rating && <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Потрясающе</span>
                                    <span className={'sp'}>
                    </span>•
                                    <span className={'sp'}>404 отзыва</span>
                                </div>}
                            </div>
                        ))}
                    </>
                )}








        </div>
    );
};

export default FeaturedProperties;