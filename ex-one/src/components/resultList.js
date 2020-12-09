import React from "react";

const ResultList = ({ resultData, backSearch }) => {
  return (
    <div className="resultList">
      <button onClick={backSearch}>Search another random</button>
      <h2>{resultData[0].owner.login}</h2>
      <img
        src={resultData[0].owner.avatar_url}
        style={{ width: 50, height: 50, borderRadius: "50%" }}
      />

      {resultData.map((data, i) => (
        <p key={i}>Repo Name: <a href={data.html_url}>{data.full_name}</a></p>
      ))}
    </div>
  );
};

export default ResultList;
