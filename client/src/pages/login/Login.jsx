import React, {useContext, useState} from 'react';
import './Login.scss'
import {AuthContext} from "../../context/authContext";
import axios from "axios";
import NavBar from "../../components/navBar/NavBar";
import Header from "../../components/header/Header";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })
    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id] : e.target.value}))
    }

    const { loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleClick = async e => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})

        try {
            const res = await axios.post('/auth/login', credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            navigate('/')

        } catch (e) {
            dispatch({type: "LOGIN_FAILURE", payload: e.response.data})
        }
    }
    return (

            <div className={'login'}>
                <div className="lContainer">
                    <input type="text" placeholder={'Введите ваш EMAIL...'} onChange={handleChange} id={'username'} className={'input'}/>
                    <input type="password" placeholder={'Введите ваш пароль...'} onChange={handleChange} id={'password'} className={'input'}/>
                    <button className="lButton" onClick={handleClick}>Войти</button>
                    {error && alert("Неверный username или пароль")}
                </div>
            </div>

    );
};

export default Login;