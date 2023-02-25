import React from 'react';
import './Reserve.scss'
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Reserve = ({setOpen, hotelId}) => {
    return (
        <div className={'reserve'}>
            <div className="rContainer">
                <FontAwesomeIcon
                    onClick={() => setOpen(false)}
                    className={'rClose'}
                    icon={faCircleXmark}

                />
                <span>Выберите подходящий номер:</span>
            </div>
        </div>
    );
};

export default Reserve;