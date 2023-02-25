import React from 'react';
import './MailList.scss'

const MailList = () => {
    return (
        <div className={'mail'}>
            <h1 className="mailTitle">Сэкономьте время и деньги!</h1>
            <span className="mailDesc">
                Подпишитесь, и мы вышлем вам лучшие предложения
            </span>
            <div className="mailInputContainer">
                <input type="text" placeholder={'Ваш электронный адрес...'}/>
                <button className={'btn'}>Подписаться</button>
            </div>
        </div>
    );
};

export default MailList;