import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const CoinGeckoPagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: itemsPerPage,
              page: currentPage,
              sparkline: false,
            },
          }
        );
        setData(response.data);
        setTotalPages(Math.ceil(100 / itemsPerPage)); // Assuming a fixed total of 100 items for this example
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages ? prev : prev + 1));
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container">
      <h1>Cryptocurrency Market Data</h1>
      <div className="card-grid">
        {data.map((coin) => (
          <div key={coin.id} className="card">
            <img src={coin.image} alt={coin.name} className="coin-image" />
            <div className="card-content">
              <h2>{coin.name}</h2>
              <p>Price: ${coin.current_price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "disabled" : ""}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          Next
        </button>
      </div>
      <button className="back-to-top" onClick={handleScrollToTop}>
      ↑
      </button>
    </div>
  );
};

export default CoinGeckoPagination;
