import React, {useContext, useState} from 'react';
import './Header.scss'
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttractionsIcon from '@mui/icons-material/Attractions';
import HailIcon from '@mui/icons-material/Hail';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import {useNavigate} from "react-router-dom";
import {SearchContext} from "../../context/SearchContext";
const Header = ({type}) => {
    const navigate = useNavigate()
    const [dateVisible, setDateVisible] = useState(false)
    const [destination, setDestination] = useState("")
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [optionsVisible, setOptionsVisible] = useState(false)

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const handleOptions = (name, operations) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name] : operations === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }
    const {dispatch} = useContext(SearchContext)
    const handleSearch = () => {
        dispatch({type: "NEW_SEARCH", payload:{destination, dates, options}})
        navigate("/hotels", {state:{destination, dates, options}})
    }



    return (
        <div className={'header'}>
            <div className={type === "list" ? 'headerContainer listMode' : 'headerContainer'}>
                <div className="headerList">
                    <div
                        onClick={() => navigate("/hotels")}
                        className="headerItem active">
                        <LocalHotelIcon/>
                        <span>Жилье</span>
                    </div>
                    <div className="headerItem">
                        <FlightIcon/>
                        <span>Авиабилеты</span>
                    </div>
                    <div className="headerItem">
                        <DirectionsCarIcon/>
                        <span>Аренда машин</span>
                    </div>
                    <div className="headerItem">
                        <AttractionsIcon/>
                        <span>Варианты досуга</span>
                    </div>
                    <div className="headerItem">
                        <HailIcon/>
                        <span>Такси от/до аэропорта</span>
                    </div>
                </div>
                { type !== "list" && <>
                 <h1 className={'headerTitle'}>Найдите жилье для новой поездки.</h1>
                    <h2 className={'headerDesc'}>Ищите спецпредложения на отели, дома и другие варианты.</h2>

                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <BedroomChildOutlinedIcon className={'headerIcon'}/>
                        <input
                            type="text"
                            placeholder={'Куда вы хотите поехать?'}
                            className={'headerSearchInput'}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                    <div

                        className="headerSearchItem">
                        <CalendarMonthOutlinedIcon

                            className={'headerIcon'}/>
                        {dateVisible && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className={'date'}
                            minDate={new Date()}
                        />}
                        <span onClick={() => setDateVisible(!dateVisible)}>{`${format(dates[0].startDate, "MM/dd/yyyy")}`} to {`${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                    </div>
                    <div
                        className="headerSearchItem">
                        <AccountCircleOutlinedIcon className={'headerIcon'}/>
                      <span
                          onClick={() => setOptionsVisible(!optionsVisible)}
                      >{options.adult} adults • {`${options.children}`} children • {`${options.room}`} rooms</span>
                        {optionsVisible && (<div className="options">
                            <div className="optionsItem">
                                <div className="optionsText">
                                    Взрослые
                                </div>
                                <div className="borderBtn">
                                    <button
                                        disabled={options.adult === 1}
                                        onClick={() => handleOptions("adult", "d")}
                                        className="optionsCountBtn">
                                        -
                                    </button>
                                    <span className={'optionsCountNumber'}> {options.adult}</span>
                                    <button
                                        onClick={() => handleOptions("adult", "i")}
                                        className="optionsCountBtn">
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="optionsItem">
                                <div className="optionsText">
                                    Дети
                                </div>

                                <div className="borderBtn">
                                    <button
                                        disabled={options.children === 0}
                                        onClick={() => handleOptions("children", "d")}
                                        className="optionsCountBtn">
                                        -
                                    </button>
                                    <span className={'optionsCountNumber'}>{options.children}</span>
                                    <button
                                        onClick={() => handleOptions("children", "i")}
                                        className="optionsCountBtn">
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="optionsItem">
                                <div className="optionsText">
                                    Номера
                                </div>
                                <div className="borderBtn">
                                    <button
                                        disabled={options.room === 1}
                                        onClick={() => handleOptions("room", "d")}
                                        className="optionsCountBtn">
                                        -
                                    </button>
                                    <span className={'optionsCountNumber'}>{options.room}</span>
                                    <button
                                        onClick={() => handleOptions("room", "i")}
                                        className="optionsCountBtn">
                                        +
                                    </button>
                                </div>
                            </div>


                        </div>)}
                    </div>
                    <div className="headerSearchItem">
                        <button

                            onClick={handleSearch} className="headerBtn">
                            Найти
                        </button>
                    </div>
                </div> </>}

            </div>
        </div>
    );
};

export default Header;