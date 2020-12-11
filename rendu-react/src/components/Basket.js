import React, { useState, useEffect } from "react";

const Basket = ({basketItem, setBasketItem}) => {
    const [cartTotal, setCartTotal] = useState(0);
    const [qtyChange, setQtyChange] = useState(null);

    const handleChange = (data) => (event) => {
   
      let arrCopy = [...basketItem];
      let indexPos = arrCopy.findIndex((item) => item.id === data.id)
      arrCopy[indexPos].qty = parseInt(event.target.value)

      setBasketItem(arrCopy)
    }

    useEffect(() => {
      total();
    }, [basketItem]);

    const total = () => {
      let totalVal = 0;
      for (let i = 0; i < basketItem.length; i++) {
        totalVal += (basketItem[i].price * basketItem[i].qty);
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
    <div>
      STORE
      {basketItem.length > 0 &&
        basketItem.map((data, i) => (
          <div key={i}>
            <p>{data.title}</p>
            <p>{data.price}</p>
            <input type="number" onChange={handleChange(data)} placeholder={data.qty}/>
            <button onClick={()=>removeFromCart(data)}>remove</button>
          </div>
        ))}
      <div>Total: ${cartTotal.toFixed(2)}</div>
    </div>
  );
};

export default Basket;
