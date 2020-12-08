import React from "react";


const Searchbar = ({searchContent, handleChange}) => {

    return (
        <>
            <input style={{marginLeft: 20}} type="text" value={searchContent} onChange={handleChange} />
        </>
    )
};

export default Searchbar;