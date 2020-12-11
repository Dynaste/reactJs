import React, { useState } from "react";

const ItemList = ({ items, basketItem, setBasketItem }) => {
  const [itemToAdd, setItemToAdd] = useState(1);

  const handleChange = (e) => {
    setItemToAdd({ qty: e.target.value, id: e.target.name });
  };

  const addToBasket = (data) => {
    if (data.id == itemToAdd.id) {
      const dataToPush = {
        id: data.id,
        title: data.title,
        price: data.price,
        img: data.image,
        qty: parseInt(itemToAdd.qty),
      };
      if (basketItem.length === 0) {
        setBasketItem([dataToPush]);
      } else {
        const isAlrdyIn = basketItem.findIndex((item) => item.id === data.id);
        console.log(isAlrdyIn);
        if(isAlrdyIn != -1){
            const newArr = [...basketItem];
            newArr[isAlrdyIn].qty = newArr[isAlrdyIn].qty + dataToPush.qty
            console.log(newArr);
            setBasketItem(newArr)

        }else {
            setBasketItem([...basketItem, dataToPush]);
        }
        
      }
    } else {
      const dataToPush = {
        id: data.id,
        title: data.title,
        price: data.price,
        img: data.image,
        qty: 1,
      };
      if (basketItem.length === 0) {
        setBasketItem([dataToPush]);
      } else {
        const isAlrdyIn = basketItem.findIndex((item) => item.id === data.id);
        console.log(isAlrdyIn);
        if(isAlrdyIn != -1){
            const newArr = [...basketItem];
            newArr[isAlrdyIn].qty = newArr[isAlrdyIn].qty + dataToPush.qty
            console.log(newArr);
            setBasketItem(newArr)

        }else {
            setBasketItem([...basketItem, dataToPush]);
        }
        
      }
    }
  };
  return (
    <div className="item-list-container">
      {items && items.length > 1 && (
        <>
          {items.map((data, i) => (
            <div className="item-container" key={i}>
              <img className="item-picture" src={data.image} />
              <h5>{data.title}</h5>
              <h4>{data.price} $</h4>
              <div className="button-item">
                <select name={data.id} onChange={handleChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
                <button onClick={() => addToBasket(data)}>Add to basket</button>
              </div>
            </div>
          ))}
        </>
      )}
      {items && items.length === 0 && (
        <div className="item-container">
          <img className="item-picture" src={items[0].image} />
          <h5>{items[0].title}</h5>
          <div className="button-item">
            <select name={items[0].id}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <button onClick={() => addToBasket(items[0])}>Add to basket</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
