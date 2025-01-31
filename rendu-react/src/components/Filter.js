import React from "react";

const Filter = ({
  tags,
  setTags,
  menClothes,
  womenClothes,
  jewelery,
  electronics,
  setSearchContent,
  searchContent
}) => {
  const handleClick = (e) => {
    setTags({
      ...tags,
      [e.target.name]: e.target.checked,
    });
  };

  const handleChange = (e) => {
    setSearchContent(e.target.value);
  };
  return (
    <div className="filter-container">
      <input
        className="search-bar"
        type="text"
        value={searchContent}
        onChange={handleChange}
        placeholder="Search one item"
      />
      {Object.keys(tags).map((data, i) => (
        <div className="tags-item" key={i}>
          {data === "Men clothing" && (
            <span>
              {"("}
              {menClothes.length}
              {")"}
            </span>
          )}
          {data === "Women clothing" && (
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
          <input type="checkbox" name={data} onChange={handleClick} checked={tags[data]} />
        </div>
      ))}
    </div>
  );
};

export default Filter;
