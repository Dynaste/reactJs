import React from "react";

const Searchbar = ({
  searchContent,
  handleChange,
  handleClick,
  handleCheck,
  onlyOwner,
}) => {
  return (
    <>
      <input
        type="text"
        className="search-input"
        value={searchContent}
        onChange={handleChange}
        placeholder="Insert github pseudo"
      />
      <div style={{ display: "flex" }}>
        <label style={{ fontSize: 14 }}>Only owner's repository</label>
        <input type="checkbox" name="Only owner's repository" onChange={handleCheck}/>
      </div>

      <button onClick={handleClick}>search</button>
    </>
  );
};

export default Searchbar;
