import "./featured.scss";
import "react-circular-progressbar/dist/styles.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";

const Featured = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [paymentStats, setPaymentStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/payments/paymentstats"
        );
        const filterData = await res.data.filter(
          (item) => MONTHS[item._id - 1] === moment().format("MMM")
        );
        setPaymentStats(filterData);
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  const revenue = paymentStats[0];

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
      </div>
      <div className="bottom">
        <p className="title">Total payments made this month</p>
        <p className="title">
          {paymentStats[0] ? revenue.total : "0"} transactions
        </p>
        <p className="title">total earned this month</p>
        <p className="amount">
          <CurrencyRupeeIcon />
          {paymentStats[0] ? revenue.total * 499 : "0"}
        </p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
      </div>
    </div>
  );
};

export default Featured;
