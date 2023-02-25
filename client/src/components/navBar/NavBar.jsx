import React, {useContext} from 'react';
import './NavBar.scss'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
const NavBar = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)

    return (
        <div className={'navbar'}>
            <div className="navContainer">
                <span
                    onClick={() => navigate('/')}
                    className={'logo'}>Booking.com</span>
                <div className="navItemEl">
                        <div className="kzt">
                            <span>KZT</span>
                            <HelpOutlineOutlinedIcon/>
                        </div>
                        <span>Зарегистрировать свой объект</span>
                </div>
                {!user ? <
                    div className="navItems">
                    <button className="navButton">Зарегистрироваться</button>
                    <button onClick={() => navigate("/login")} className="navButton">Войти</button>
                </div>
                :
                    <
                        div className="navItems">
                        <button className="navButton">Личный кабинет</button>
                        <button onClick={() => navigate("/login")} className=" navButton">Выйти</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default NavBar;