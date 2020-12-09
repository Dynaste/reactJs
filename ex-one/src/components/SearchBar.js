import React from "react";


const Searchbar = ({searchContent, handleChange, handleClick}) => {

    return (
        <>
            <input style={{marginLeft: 20}} type="text" value={searchContent} onChange={handleChange} />
            <button onClick={handleClick}>search</button>
        </>
    )
};

export default Searchbar;