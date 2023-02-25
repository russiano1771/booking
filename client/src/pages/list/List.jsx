import React, {useState} from 'react';
import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import './List.scss'
import {useLocation} from "react-router-dom";
import {format} from "date-fns";
import {DateRange} from "react-date-range";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {

    const location = useLocation()

    const [destination, setDestination] = useState(location.state.destination)
    const [dates, setDates] = useState(location.state.dates)
    const [openDate, setOpenDate] = useState(false)
    const [options, setOptions] = useState(location.state.options)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)

    const { data, loading, error, reFetchData} = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 500000}`)

    const handleClick = () => {
        reFetchData()
    }

    return (
        <div className={'hotels'}>
      <NavBar/><Header type={"list"}/>
            <div className="listContainer">
                <div className="listWrap">
                    <div className="listSearch">
                        <h1 className="listTitle">Найти</h1>
                        <div className="lsItem">
                            <label htmlFor="destination">Место / название объекта</label>
                            <input type="text" id={'destination'} placeholder={ destination}/>
                        </div>

                        <div className="lsItem">
                            <label htmlFor="destination">Заезд/отъезд</label>
                            <span onClick={() => setOpenDate(!openDate)}> <CalendarMonthOutlinedIcon

                                className={'headerIcon'}/>
                                {`${format(dates[0].startDate, "MM/dd/yyyy")}`} to {`${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                className={'date'}
                                minDate={new Date()}
                            />}
                        </div>
                        <div className="lsItem">
                                <div className="lsOptions">
                                    <div className={'labelOpDiv'}>
                                        <label
                                            className={'labelOp'}
                                            htmlFor="">Параметры</label>
                                    </div>
                                    <div className="lsOptionItem">
                                <span className="lsOptionText">
                                    Мин. цена <small>за ночь</small>
                                </span>
                                        <input
                                            onChange={(e) => setMin(e.target.value)}
                                            type="number" className="lsOptionInput"/>
                                    </div>

                                    <div className="lsOptionItem">
                                <span className="lsOptionText">
                                    Макс. цена <small>за ночь</small>
                                </span>
                                        <input
                                            onChange={(e) => setMax(e.target.value)}
                                            type="number" className="lsOptionInput"/>
                                    </div>


                                    <div className="lsOptionItem">
                                <span className="lsOptionText">
                                    Взрослые
                                </span>
                                        <input
                                            min={1}
                                            placeholder={options.adult}
                                            type="number" className="lsOptionInput"/>
                                    </div>


                                    <div className="lsOptionItem">
                                <span className="lsOptionText">
                                    Дети
                                </span>
                                        <input
                                            min={0}
                                            placeholder={options.children}
                                            type="number" className="lsOptionInput"/>
                                    </div>


                                    <div className="lsOptionItem">
                                <span className="lsOptionText">
                                    Номера
                                </span>
                                        <input
                                            min={1}
                                            placeholder={options.room}
                                            type="number" className="lsOptionInput"/>
                                    </div>
                                </div>


                        </div>
                            <button
                            onClick={handleClick}
                            >Найти</button>
                    </div>
                    <div className="listResult">
                        {loading ? "Loading, please wait" : <>
                            {data.map( item => (
                                <SearchItem
                                    item={item}
                                    key={item._id}/>
                            ))}
                        </>}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;