import React, {useContext, useState} from 'react';
import './Hotel.scss'
import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WifiIcon from '@mui/icons-material/Wifi';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import {useLocation} from "react-router-dom";
import {SearchContext} from "../../context/SearchContext";
import {AuthContext} from "../../context/authContext";
import {useNavigate} from "react-router";
import Reserve from "../../components/reserve/Reserve";




const Hotel = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)


    const { data, loading, error} = useFetch(`/hotels/find/${id}`)

    const {dates, options} = useContext(SearchContext)
    const {user} = useContext(AuthContext)

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dayDifference(dates[0].endDate, dates[0].startDate);
    const handleOpen = (i) => {
        setSlideNumber(i)
        setOpen(true)
    }
    const navigate = useNavigate()


    const handleMove = (direction) => {
        let newSlideNumber;
        if (direction === "l"){
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
        }

        return setSlideNumber(newSlideNumber)
    }

    const handleClick = () => {
        if (user){
            setOpenModal(true)
        } else {
            navigate('/login')
        }

    }

    return (
        <div className={'hotel'}>
           <NavBar/>
            <Header type={'list'}/>
            {loading ? "Loading, please wait" : (<div className="hotelContainer">
                {open && <div className="slider">
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="close"
                        onClick={() => setOpen(false)}
                    />
                    <FontAwesomeIcon
                        onClick={() => handleMove("l")}
                        icon={faCircleArrowLeft}
                        className="arrow"
                    />
                    <div className="sliderWrapper">
                        <img
                            className={'sliderImg'}
                            src={data.photos[slideNumber]} alt=""/>
                    </div>
                    <FontAwesomeIcon
                        onClick={() => handleMove("r")}
                        icon={faCircleArrowRight}
                        className="arrow"
                    />
                </div>}
                <div className="hotelWrapper">
                    <button
                        onClick={handleClick}
                        className="bookNow">?????????????????????????? ????????????</button>
                    <h1 className="hotelTitle">
                        {data.name}
                    </h1>
                    <div className="hotelAddress">
                    <LocationOnIcon/>
                        <span>{data.address}</span>
                    </div>
                    <span className="hotelDistance">
                        ???????????????????????? ???????????????????????? ??? {data.distance} ???? ????????????
                    </span>
                    <span className="hotelPriceHighlight">
                        ???????????????????????? ???????????????????? ?? ???????? ?????????? ???? ?????????? ?????????? {data.cheapestPrice} ?? ???????????????? ???????????????????? ?????????? ???? ??????????????????!
                    </span>
                    <div className="hotelImages">
                        {data.photos?.map( (photo, i) => (
                            <div className={'hotelImgWrapper'}>
                                <img
                                        onClick={ () => handleOpen(i)}
                                        height={250}
                                    src={photo} alt="" className={'hotelImg'}/>
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsText">
                            <h1 className="hotelTitle">
                                {data.title}
                            </h1>
                            <p className={'hoteldesc'}>
                                {data.desc}
                            </p>




                        </div>



                        <div className="hotelDetailsPrice">
                            <h1>???????????????????????? ?????????? ????????????????</h1>
                            <span>  <LocationOnIcon/> ???????????????? ????????????????????????: ?????????????? ???????????? ???? ?????????????? ???????????????????? ???????????? (9,2)</span>
                            <span> <LocalParkingIcon/> ???????????????????? ???????????????? ???? ????????????????????</span>
                            <h2><b>{days * data.cheapestPrice * options?.room}P </b>???? {days} ????????</h2>
                            <button onClick={handleClick}>??????????????????????????</button>
                        </div>





                    </div>
                    <div className="featuredHotel">
                        <h1 className={'hotelTitle'}>?????????? ???????????????????? ???????????????? ?? ????????????</h1>
                        <div className={'hotelAddress2'}>
                            <div className="hotelListItem">
                                <WifiIcon className={'featuredIcon'}/> <span>???????????????????? Wi-FI</span>
                            </div>
                            <div className="hotelListItem">
                                <FamilyRestroomIcon className={'featuredIcon'}/> <span>???????????????? ????????????</span>
                            </div>
                            <div className="hotelListItem">
                                <RestaurantMenuIcon className={'featuredIcon'}/> <span>?? ?????????????????? ?????????????? ?????????????? ?? ????????</span>
                            </div>
                            <div className="hotelListItem">
                                <SmokeFreeIcon className={'featuredIcon'}/> <span>???????????? ?????? ??????????????????</span>
                            </div>
                        </div>
                    </div>
                </div>
                <MailList/>
                <Footer/>
            </div>
            )}
            {openModal && <Reserve hotelId={id} setOpen={setOpenModal}/>}
        </div>
    );
};

export default Hotel;