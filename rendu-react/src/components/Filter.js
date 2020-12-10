import React from "react";

const Filter = ({
  tags,
  setTags,
  menClothes,
  womenClothes,
  jewelery,
  electronics,
  setSearchContent
}) => {
  const handleClick = (e) => {
    setTags({
      ...tags,
      [e.target.name]: e.target.checked,
    });
  };

  const handleChange = (e) => {
      setSearchContent(e.target.value)
  }
  return (
    <div className="filter-container">
        <div>
            <input className="search-bar" type="text" onChange={handleChange}/>
        </div>
      {Object.keys(tags).map((data, i) => (
        <div className="tags-item" key={i}>
          {data === "Men clothes" && (
            <span>
              {"("}
              {menClothes.length}
              {")"}
            </span>
          )}
          {data === "Women clothes" && (
            <span>
              {"("}
              {womenClothes.length}
              {")"}
            </span>
          )}
          {data === "Electronics" && (
            <span>
              {"("}
              {electronics.length}
              {")"}
            </span>
          )}
          {data === "Jewelery" && (
            <span>
              {"("}
              {jewelery.length}
              {")"}
            </span>
          )}
          <h4>{data}</h4>
          <input type="checkbox" name={data} onClick={handleClick} />
        </div>
      ))}
    </div>
  );
};

export default Filter;
