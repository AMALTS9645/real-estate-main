import "./newList.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/st-joseph-s-college-of-engineering-and-technology/image/upload",
            data
          );
          console.log(uploadRes)
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newHouse = {
        ...info,
        photos: list,
      };

      await axios.post("http://localhost:8080/api/houses", newHouse);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Furnishing</label>
                <select id="furnishing" onChange={handleChange}>
                  <option value={"Furnished"}>Furnished</option>
                  <option value={"Semi-Furnished"}>Semi-Furnished</option>
                  <option value={"UnFurnished"}>UnFurnished</option>
                </select>
              </div>
              <div className="formInput">
                <label>Listed By</label>
                <select id="listedBy" onChange={handleChange}>
                  <option value={"Admin"}>_______</option>
                  <option value={"Admin"}>Admin</option>
                </select>
              </div>
              <div className="formInput">
                <label>Facing</label>
                <select id="facing" onChange={handleChange}>
                  <option value={"East"}>East</option>
                  <option value={"West"}>West</option>
                  <option value={"North"}>North</option>
                  <option value={"South"}>South</option>
                </select>
              </div>
              <div className="formInput">
                <label>Playground Facility</label>
                <select id="isPlayGround" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput">
                <label>Car Parking Facility</label>
                <select id="isCarParking" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput">
                <label>Current and Water Facility</label>
                <select id="isCurrentAndWater" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput">
                <label>Garden ?</label>
                <select id="isGarden" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput">
                <label>featured ?</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
