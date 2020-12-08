import React from "react";

const AppartmentsList = ({ appartments }) => {
  return (
    <>
      {appartments.map((appartment, index) => (
        <div key={index} className="item-container">
          <p>Title : {appartment.title}</p>
          <p>Price : {appartment.price}$</p>
          <p>Rates : {appartment.rating}</p>
          <p>Available : {appartment.isAvailable ? "yes" : "no"}</p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default AppartmentsList;
