import React, { useEffect, useState } from "react";

const Card = ({ image, altText, countryName }) => {
  return (
    <div
      className="countryCard" 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #0e0d0d",
        borderRadius: "8px",
        height: "200px",
        width: "200px",
        justifyContent: "center",
      }}
    >
      <img src={image} alt={altText} width={100} height={100} />
      <h2 style={{ fontSize: "17px" }}>{countryName}</h2>
    </div>
  );
};

const api =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

export default function Flagsection() {
  const [flags, setFlags] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((jsonRes) => setFlags(jsonRes))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const filteredFlags = flags.filter((item) =>
    item.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <div style={{ width: "100%" }}>
        <input
          type="text" 
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredFlags.map((item) => (
        <Card
          key={item.common}
          image={item.png}
          altText={item.common}
          countryName={item.common}
        />
      ))}
    </div>
  );
}
