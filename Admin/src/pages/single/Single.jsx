import "./single.scss";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Single = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // const lists = location.state.list;
  const item = location.state.list.filter((item) => item._id === id);
  const data = item[0];

  const [updateMode, setUpdateMode] = useState(false);
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [country, setCountry] = useState(data.country);
  const [city, setCity] = useState(data.city);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        country: country,
        city: city,
      };
      console.log(newUser);

      setUpdateMode(false);
      await axios.put(`http://localhost:8080/api/users/${data._id}`, newUser);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {!updateMode && (
              <div onClick={(e) => setUpdateMode(true)} className="editButton">
                <EditIcon />
                Edit
              </div>
            )}
            <h1 className="title">User Information</h1>
            <div className="item">
              <img src={data.img} alt="" className="itemImg" />
              <div className="details">
                {updateMode ? (
                  <div className="inputItem">
                    firstName{" "}
                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      value={firstName}
                    />
                    lastName{" "}
                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      value={lastName}
                    />
                  </div>
                ) : (
                  <h1 className="itemTitle">
                    {data.firstName} {data.lastName}
                  </h1>
                )}
                {updateMode ? (
                  <div className="inputItem">
                    email{" "}
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      value={email}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{data.email}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="inputItem">
                    phone{" "}
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      value={phone}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{data.phone}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="inputItem">
                    country{" "}
                    <input
                      onChange={(e) => setCountry(e.target.value)}
                      type="text"
                      value={country}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">{data.country}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="inputItem">
                    city{" "}
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      type="text"
                      value={city}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">City:</span>
                    <span className="itemValue">{data.city}</span>
                  </div>
                )}
                {updateMode && (
                  <div onClick={handleUpdate} className="editButton">
                    <SaveIcon />
                    Save
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
