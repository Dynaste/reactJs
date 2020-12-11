import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingPic from "./loading.svg";

import Header from "./components/Header";
import ItemList from "./components/ItemList";
import Filter from "./components/Filter";
import Basket from "./components/Basket";

const App = () => {
  const [defaultItems, setDefaultItems] = useState(null);
  const [items, setItems] = useState(null);
  const [itemSearch, setItemSearch] = useState(null);
  const [menClothes, setMenClothes] = useState(null);
  const [jewelery, setJewelery] = useState(null);
  const [electronics, setElectronics] = useState(null);
  const [womenClothes, setWomenClothes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [basketItem, setBasketItem] = useState([]);
  const [searchContent, setSearchContent] = useState("");
  const [tags, setTags] = useState({
    ["Women clothing"]: false,
    ["Electronics"]: false,
    ["Men clothing"]: false,
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

      await setItems(result.data);
      await setDefaultItems(result.data);
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

  const verificationTags = () => {
    for (const el in tags) {
      if (tags[el] === true) {
        return true;
      }
    }
  };

  const itemToDisplay = async () => {
    try {
      setIsLoading(true);
      await setSearchContent("");
      let newArr = [];
      console.log("start", newArr);

      if (tags["Women clothing"]) {
        newArr = [...newArr, ...womenClothes];
        console.log("women", newArr);
      }
      if (tags["Men clothing"]) {
        newArr = [...newArr, ...menClothes];
        console.log("men", newArr);
      }
      if (tags["Jewelery"]) {
        newArr = [...newArr, ...jewelery];
        console.log("jewelery", newArr);
      }
      if (tags["Electronics"]) {
        newArr = [...newArr, ...electronics];
        console.log("electronics", newArr);
      }
      console.log("end", newArr);
      setItems(newArr);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const searchResult = async () => {
    try {
      await setItemSearch(null);
      let result = [];
      items.forEach((el) => {
        if (el.title.toLowerCase().includes(searchContent.toLowerCase())) {
          result.push(el);
        }
      });
      if (result.length > 0) {
        await setItems(result);
      } else {
        await setItemSearch("no result");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (verificationTags()) {
      itemToDisplay();
    } else {
      setItems(defaultItems);
    }
  }, [tags]);

  useEffect(() => {
    if (searchContent) {
      searchResult();
    } else {
      setItems(defaultItems);
      setTags({
        ["Women clothing"]: false,
        ["Electronics"]: false,
        ["Men clothing"]: false,
        ["Jewelery"]: false,
      });
    }
  }, [searchContent]);

  return (
    <div id="app">
      {isLoading && (
        <div className="loading-container">
          <img src={LoadingPic} />
        </div>
      )}
      {isOpen && (
        <Basket
          basketItem={basketItem}
          setBasketItem={setBasketItem}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {!isLoading && (
        <>
          <Header
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            basketItem={basketItem}
          />
          <div className="content-container">
            <Filter
              tags={tags}
              setTags={setTags}
              menClothes={menClothes}
              womenClothes={womenClothes}
              jewelery={jewelery}
              electronics={electronics}
              setSearchContent={setSearchContent}
              searchContent={searchContent}
            />
            {!itemSearch && (
              <ItemList
                items={items}
                basketItem={basketItem}
                setBasketItem={setBasketItem}
              />
            )}

            {searchContent && itemSearch && <h2>No result</h2>}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
