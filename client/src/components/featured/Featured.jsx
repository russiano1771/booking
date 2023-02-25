import React from 'react';
import './Featured.scss'
import useFetch from "../../hooks/useFetch";

const Featured = () => {
    const { data, loading, error} = useFetch("hotels/countByCity?cities=Madrid,Berlin")

    return (
        <div className={'featured'}>
            {loading ? ("Подбираем лучшие варианты, подождите") :( <>
                <div className="featuredItem">
                    <img
                        className={'featuredImg'}
                        src="https://cf.bstatic.com/xdata/images/city/600x600/654659.jpg?k=9c4ac59d35869485631346dc1ee16d28e82ec5f79654bf56b4b4eaeef3388299&o=" alt=""/>
                    <div className="featuredTitles">
                        <h1 className={'shadow'}>Стамбул </h1>
                        <h1 className={'shadow'}>{data[0]} .... </h1>
                        <img
                            className={'svg'}
                            width={20} height={20}
                            src="https://raw.githubusercontent.com/lipis/flag-icons/29edfe0288970b77976024832f1f3cf0a8667357/flags/1x1/tr.svg" alt=""/>
                    </div>
                </div>

                <div className="featuredItem">
                    <img
                        className={'featuredImg'}
                        src="https://cf.bstatic.com/xdata/images/city/600x600/685485.jpg?k=ae62e268e30e07d3f45274429b558d5c3dc40f2bf3351ee47f6cff4b59f227d4&o=" alt=""/>
                    <div className="featuredTitles">
                        <h1 className={'shadow'}>Dublin </h1>
                        <h1 className={'shadow'}>{data[1]} .... </h1>
                        <img
                            className={'svg'}
                            width={20} height={20}
                            src="https://raw.githubusercontent.com/lipis/flag-icons/29edfe0288970b77976024832f1f3cf0a8667357/flags/1x1/kz.svg" alt=""/>
                    </div>
                </div>

                <div className="featuredItem">
                    <img
                        className={'featuredImg'}
                        src="https://cf.bstatic.com/xdata/images/city/600x600/686023.jpg?k=315b82bac9991c71d6f14f8618e68a9b6d3f45b61b9ceb335523918d0e086dbf&o=" alt=""/>
                    <div className="featuredTitles">
                        <h1 className={'shadow'}>New York</h1>
                        <h1 className={'shadow'}>{data[2]} .... </h1>
                        <img
                            className={'svg'}
                            width={20} height={20}
                            src="https://raw.githubusercontent.com/lipis/flag-icons/29edfe0288970b77976024832f1f3cf0a8667357/flags/1x1/uz.svg" alt=""/>
                    </div>
                </div>


            </>)}</div>
    );
};

export default Featured;