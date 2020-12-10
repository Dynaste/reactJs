import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingPic from "./loading.svg";

import Header from "./components/Header";
import ItemList from "./components/ItemList";
import Filter from "./components/Filter";

const App = () => {
  const [items, setItems] = useState(null);
  const [menClothes, setMenClothes] = useState(null);
  const [jewelery, setJewelery] = useState(null);
  const [electronics, setElectronics] = useState(null);
  const [womenClothes, setWomenClothes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchContent, setSearchContent] = useState(null);
  const [tags, setTags] = useState({
    ["Women clothes"]: false,
    ["Electronics"]: false,
    ["Men clothes"]: false,
    ["Jewelery"]: false,
  });

  const getItems = async () => {
    try {
      const result = await axios.get("https://fakestoreapi.com/products");
      const menArr = [];
      const womenArr = [];
      const jewelArr = [];
      const electArr = [];

      result.data.forEach((el) => {
        if (el.category === "men clothing") {
          menArr.push(el);
        }
        if (el.category === "women clothing") {
          womenArr.push(el);
        }
        if (el.category === "jewelery") {
          jewelArr.push(el);
        }
        if (el.category === "electronics") {
          electArr.push(el);
        }
      });

      await setItems(result);
      await setMenClothes(menArr);
      await setWomenClothes(womenArr);
      await setJewelery(jewelArr);
      await setElectronics(electArr);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div id="app">
      {isLoading && (
        <div className="loading-container">
          <img src={LoadingPic} />
        </div>
      )}
      {!isLoading && (
        <>
          <Header />
          <div className="content-container">
            <Filter
              tags={tags}
              setTags={setTags}
              menClothes={menClothes}
              womenClothes={womenClothes}
              jewelery={jewelery}
              electronics={electronics}              
              setSearchContent={setSearchContent}
            />
            <ItemList items={items} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
