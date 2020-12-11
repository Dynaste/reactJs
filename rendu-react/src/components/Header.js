import React from "react";
import BasketPic from "./shop.png"


const Header = ({isOpen, setIsOpen, basketItem}) => {

    const openBasket = () => {
        setIsOpen(!isOpen)
    }
    return(
        <div className="header">
            <img className="header-basket" src={BasketPic} onClick={openBasket} alt="basket" />
        <span className="header-basket-number">{(basketItem.length)}</span>
        </div>
    )
}

export default Header;