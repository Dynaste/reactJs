import React from "react";

const FilterList = ({isClick, handleClick}) => {
  return (
    <>
      <button onClick={()=>handleClick()}>{isClick ? "Only available" : "See all"}</button>
    </>
  );
};


export default FilterList;