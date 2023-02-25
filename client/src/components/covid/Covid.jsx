import React, {useState} from 'react';
import './Covid.scss'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Link} from "react-router-dom";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const Covid = () => {

    const [covidOpen, setCovidOpen] = useState(false)
    return (
        <div className={'covid'}>
            <div className="covidContainer">
                <div className="job">
                    <input type="checkbox" id={'covid'}/>
                    <label
                        className={'label'}
                        style={{marginLeft:10}} htmlFor="{'covid'}">Я путешествую по работе</label>
                </div>
                <div
                    onClick={() => setCovidOpen(!covidOpen)}
                    className="covidCard">
                    <div className="covTit">
                        <div className="cov">
                            <InfoOutlinedIcon/>
                            <span className={'spanTitle'}>Коронавирус (COVID-19): помощь и поддержка</span>
                        </div>
                        <KeyboardArrowUpOutlinedIcon
                            onClick={() => setCovidOpen(!covidOpen)}
                        className={'arrow'}
                        />
                    </div>
                    { covidOpen &&
                        <div className={'covidOpen'}>
                        <span className={'spanDesc'}>Посмотрите последнюю информацию об ограничениях на поездки в связи с коронавирусом до начала путешествия.</span>
                        <Link
                            className={'link'}
                            to={'/'}>Узнать больше</Link>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Covid;