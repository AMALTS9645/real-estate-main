import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LandscapeIcon from "@mui/icons-material/Landscape";
import HouseIcon from "@mui/icons-material/House";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Widget = ({ type, name }) => {
  let data;

  const navigate = useNavigate();

  const LandData = () => {
    const { data, loading, error } = useFetch(
      "http://localhost:8080/api/lands/countByTypes"
    );
    return data;
  };

  const lands = LandData();

  const ListData = () => {
    const { data, loading, error } = useFetch(
      "http://localhost:8080/api/houses/countByType"
    );
    return data;
  };

  const lists = ListData();

  const UserData = () => {
    const { data, loading, error } = useFetch(
      "http://localhost:8080/api/users/count/numbers"
    );
    return data;
  };

  const user = UserData();

  const PaymentData = () => {
    const { data, loading, error } = useFetch(
      "http://localhost:8080/api/payments/getpaymentnumbers"
    );
    return data;
  };

  const payment = PaymentData();

  const handleNavigate = () => {
    switch (type) {
      case "user":
        navigate("/users");
        break;
      case "house":
        navigate("/houses");
        break;
      case "land":
        navigate("/lands");
        break;
      case "payment":
        navigate("/payments");
        break;
      default:
        break;
    }
  };

  //temporary
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        number: user,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "house":
      data = {
        title: "HOUSES",
        isMoney: false,
        number: lists,
        link: "View all houses",
        icon: (
          <HouseIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "land":
      data = {
        title: "LANDS",
        isMoney: false,
        number: lands,
        link: "View all lands",
        icon: (
          <LandscapeIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "payment":
      data = {
        title: "PAYMENTS",
        isMoney: false,
        number: payment,
        link: "See payment details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && <CurrencyRupeeIcon />} {data.number}
        </span>
        <span onClick={handleNavigate} className="link">
          {data.link}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
