import React from "react";

const ResultList = ({resultData}) => {
  return (
    <div className="resultList">
      <img
        src={resultData[0].owner.avatar_url}
        style={{ width: 50, height: 50, borderRadius: "50%" }}
      />

      {resultData.map((data, i) => (
        <p key={i}>Repo Name: {data.full_name}</p>
      ))}
    </div>
  );
};

export default ResultList;
