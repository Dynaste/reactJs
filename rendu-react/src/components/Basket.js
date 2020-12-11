import React, { useState, useEffect } from "react";

const Basket = ({ basketItem, setBasketItem, isOpen, setIsOpen }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [qtyChange, setQtyChange] = useState(null);

  const openBasket = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (data) => (event) => {
    let arrCopy = [...basketItem];
    let indexPos = arrCopy.findIndex((item) => item.id === data.id);
    arrCopy[indexPos].qty = parseInt(event.target.value);

    setBasketItem(arrCopy);
  };

  useEffect(() => {
    total();
  }, [basketItem]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < basketItem.length; i++) {
      totalVal += basketItem[i].price * basketItem[i].qty;
    }
    setCartTotal(totalVal);
  };

  const removeFromCart = (el) => {
    let hardCopy = [...basketItem];
    hardCopy = hardCopy.filter((basketItem) => basketItem.id !== el.id);
    setBasketItem(hardCopy);
  };

  // const updateFromCart = (el) => {

  //     let hardCopy = [...basketItem];
  //     hardCopy[hardCopy.findIndex((basketItem) => basketItem.id === el.id)].qty = qtyChange;

  //     setBasketItem([...hardCopy])
  // }

  return (
    <div className="basket-large-container">
      <div className="basket-container">
        <button onClick={openBasket}>close</button>
        {basketItem.length > 0 &&
          basketItem.map((data, i) => (
            <div className="basket-item" key={i}>
              <img src={data.img}/>
              <p>{data.title}</p>
              <p>{data.price}$</p>
              <input
                type="number"
                onChange={handleChange(data)}
                value={data.qty}
              />
              <button onClick={() => removeFromCart(data)}>remove</button>
            </div>
          ))}
        <div>Total: ${cartTotal.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Basket;
