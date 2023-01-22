import "./singleList.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloseIcon from "@mui/icons-material/Close";

const SingleList = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const item = location.state.list.filter((item) => item._id === id);
  const dataInput = item[0];
  const [data, setData] = useState(dataInput);
  const [datas, setDatas] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [files, setFiles] = useState("");
  const [imageUpdateMode, setImageUpdateMode] = useState(false);

  console.log(data);
  useEffect(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/houses/find/${id}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const user = await axios.get(
        `http://localhost:8080/api/users/${data.userId}`
      );
      setDatas(user.data);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  const [myFormFields, setFormFields] = useState({
    name: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    listedBy: "",
    price: "",
    bedRoom: "",
    bathRoom: "",
    balcony: "",
    floors: "",
    plotArea: "",
    furnishing: "",
    facing: "",
    isPlayGround: "",
    isCarParking: "",
    isCurrentAndWater: "",
    isGarden: "",
  });

  useEffect(() => {
    setFormFields({
      ...myFormFields,
      name: data.name,
      city: data.city,
      address: data.address,
      distance: data.distance,
      title: data.title,
      desc: data.desc,
      listedBy: data.listedBy,
      price: data.price,
      bedRoom: data.bedRoom,
      bathRoom: data.bathRoom,
      balcony: data.balcony,
      floors: data.floors,
      plotArea: data.plotArea,
      furnishing: data.furnishing,
      facing: data.facing,
      isPlayGround: data.isPlayGround,
      isCarParking: data.isCarParking,
      isCurrentAndWater: data.isCurrentAndWater,
      isGarden: data.isGarden,
    });
  }, [updateMode]);

  const onFormFieldChange = (e) => {
    setFormFields({
      ...myFormFields,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(myFormFields);
  const onUpdateData = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        ...myFormFields,
      };
      console.log(newPost);
      await axios.put(`http://localhost:8080/api/houses/${data._id}`, newPost);
      setUpdateMode(false);
      window.location.reload();
      toast.success("Property Updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleImage = (e) => {
    setFiles(e.target.files);
    setImageUpdateMode(true);
  };

  const updateAllImages = async (e) => {
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
          console.log(uploadRes);
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newImages = {
        photos: list,
      };

      await axios.put(
        `http://localhost:8080/api/houses/${data._id}`,
        newImages
      );
      toast.success("New Images Added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <ToastContainer />
        <div className="top">
          <div className="left">
            <div>
              {!updateMode && (
                <div
                  onClick={() => setUpdateMode(true)}
                  className="editButton"
                  style={{
                    borderRadius: "20px",
                    fontSize: "25px",
                    height: "30px",
                    width: "200px",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  Edit
                </div>
              )}
              {updateMode && (
                <div
                  onClick={onUpdateData}
                  className="editButton"
                  style={{
                    borderRadius: "20px",
                    fontSize: "25px",
                    height: "30px",
                    width: "200px",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  Save
                </div>
              )}
              {updateMode && (
                <div
                  className="editCloseBtn"
                  onClick={() => setUpdateMode(false)}
                >
                  <CloseIcon />
                </div>
              )}

              <h1 className="title">House Information</h1>
            </div>

            <div className="item">
              {updateMode ? (
                imageUpdateMode ? (
                  <div
                    style={{
                      cursor: "pointer",
                      fontWeight: 500,
                      display: "flex",
                      flexDirection: "row",
                      gap: "5px",
                      width: "100px",
                      height: "100px",
                      borderRadius: "10%",
                      objectFit: "cover",
                      margin: "10px",
                      height: "100%",
                    }}
                  >
                    <div>
                      <img
                        className="imageImage"
                        src={
                          files
                            ? URL.createObjectURL(files[0])
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                      <img
                        className="imageImage"
                        src={
                          files
                            ? URL.createObjectURL(files[1])
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                      <img
                        className="imageImage"
                        src={
                          files
                            ? URL.createObjectURL(files[2])
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                      <img
                        className="imageImage"
                        src={
                          files
                            ? URL.createObjectURL(files[3])
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                      <img
                        className="imageImage"
                        src={
                          files
                            ? URL.createObjectURL(files[4])
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                      <img
                        className="imageImage"
                        src={
                          files
                            ? URL.createObjectURL(files[5])
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="saveEditBtn" onClick={updateAllImages}>
                      Save
                      <SaveAltIcon />
                    </div>
                  </div>
                ) : (
                  <div className=" saveEditBtn formInput">
                    <label htmlFor="file">
                      Add Image:{" "}
                      <CloudUploadIcon
                        style={{ cursor: "pointer", fontSize: "30px" }}
                      />
                    </label>
                    <input
                      type="file"
                      id="file"
                      multiple
                      onChange={handleImage}
                      style={{ display: "none" }}
                    />
                  </div>
                )
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    maxHeight: "800px",
                  }}
                >
                  <img src={data.photos[0]} alt="" className="itemImg" />
                  <img src={data.photos[1]} alt="" className="itemImg" />
                  <img src={data.photos[2]} alt="" className="itemImg" />
                  <img src={data.photos[3]} alt="" className="itemImg" />
                  <img src={data.photos[4]} alt="" className="itemImg" />
                  <img src={data.photos[5]} alt="" className="itemImg" />
                </div>
              )}
              <div className="details">
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Name:</span>
                    <input
                      name="name"
                      className="nameInput"
                      type="text"
                      value={myFormFields.name || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <h1 className="itemTitle">{data.name}</h1>
                )}
                <div className="detailItem">
                  <span className="itemKey">Posted By:</span>
                  <span className="itemValue">
                    {datas.firstName} {datas.lastName}
                  </span>
                </div>
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <input
                      name="address"
                      className="nameInput"
                      type="text"
                      value={myFormFields.address || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{data.address}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">City:</span>
                    <input
                      name="city"
                      className="nameInput"
                      type="text"
                      value={myFormFields.city || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">City:</span>
                    <span className="itemValue">{data.city}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Plot Area:</span>
                    <input
                      name="plotArea"
                      className="nameInput"
                      type="number"
                      value={myFormFields.plotArea || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Plot Area:</span>
                    <span className="itemValue">{data.plotArea} cent</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <input
                      name="price"
                      className="nameInput"
                      type="text"
                      value={myFormFields.price || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{data.price}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Sub Title:</span>
                    <input
                      name="title"
                      className="nameInput"
                      type="text"
                      value={myFormFields.title || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Sub Title:</span>
                    <span className="itemValue">{data.title}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <textarea
                      name="desc"
                      className="nameDesc"
                      type="textarea"
                      value={myFormFields.desc || ""}
                      onChange={onFormFieldChange}
                    ></textarea>
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue ">{data.desc}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Distance:</span>
                    <input
                      name="distance"
                      className="nameInput"
                      type="text"
                      value={myFormFields.distance || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Distance:</span>
                    <span className="itemValue">{data.distance}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Facing:</span>
                    <select
                      value={myFormFields.facing || ""}
                      id="facing"
                      name="facing"
                      onChange={onFormFieldChange}
                    >
                      <option value={"East"}>East</option>
                      <option value={"West"}>West</option>
                      <option value={"North"}>North</option>
                      <option value={"South"}>South</option>
                    </select>
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Facing:</span>
                    <span className="itemValue">{data.facing}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Furnishing:</span>
                    <select
                      value={myFormFields.furnishing || ""}
                      id="furnishing"
                      name="furnishing"
                      onChange={onFormFieldChange}
                    >
                      <option value={"Furnished"}>Furnished</option>
                      <option value={"Semi-Furnished"}>Semi-Furnished</option>
                      <option value={"UnFurnished"}>UnFurnished</option>
                    </select>
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Furnishing:</span>
                    <span className="itemValue">{data.furnishing}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Bed Rooms:</span>
                    <input
                      name="bedRoom"
                      className="nameInput"
                      type="number"
                      value={myFormFields.bedRoom || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Bed Rooms:</span>
                    <span className="itemValue">{data.bedRoom}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Bath Rooms:</span>
                    <input
                      name="bathRoom"
                      className="nameInput"
                      type="number"
                      value={myFormFields.bathRoom || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Bath Rooms:</span>
                    <span className="itemValue">{data.bathRoom}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Balcony:</span>
                    <input
                      name="balcony"
                      className="nameInput"
                      type="number"
                      value={myFormFields.balcony || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Balcony:</span>
                    <span className="itemValue">{data.balcony}</span>
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Floors:</span>
                    <input
                      name="floors"
                      className="nameInput"
                      type="number"
                      value={myFormFields.floors || ""}
                      onChange={onFormFieldChange}
                    />
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Floors:</span>
                    <span className="itemValue">{data.floors}</span>
                  </div>
                )}
                <div className="detailItem">
                  <span className="itemKey">Listed By:</span>
                  <span className="itemValue">{data.listedBy}</span>
                </div>
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Featured:</span>
                    <select
                      value={myFormFields.isFeatured}
                      name="isFeatured"
                      onChange={onFormFieldChange}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Featured:</span>
                    {data.featured ? (
                      <span className="itemValue">Yes</span>
                    ) : (
                      <span className="itemValue">No</span>
                    )}
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Car Parking:</span>
                    <select
                      value={myFormFields.isCarParking}
                      name="isCarParking"
                      onChange={onFormFieldChange}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Car Parking:</span>
                    {data.isCarParking ? (
                      <span className="itemValue">Yes</span>
                    ) : (
                      <span className="itemValue">No</span>
                    )}
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Current and Water:</span>
                    <select
                      value={myFormFields.isCurrentAndWater}
                      name="isCurrentAndWater"
                      onChange={onFormFieldChange}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Current and Water:</span>
                    {data.isCurrentAndWater ? (
                      <span className="itemValue">Yes</span>
                    ) : (
                      <span className="itemValue">No</span>
                    )}
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Garden:</span>
                    <select
                      value={myFormFields.isGarden}
                      name="isGarden"
                      onChange={onFormFieldChange}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Garden:</span>
                    {data.isGarden ? (
                      <span className="itemValue">Yes</span>
                    ) : (
                      <span className="itemValue">No</span>
                    )}
                  </div>
                )}
                {updateMode ? (
                  <div className="detailItem">
                    <span className="itemKey">Play Ground:</span>
                    <select
                      value={myFormFields.isPlayGround}
                      name="isPlayGround"
                      onChange={onFormFieldChange}
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
                  </div>
                ) : (
                  <div className="detailItem">
                    <span className="itemKey">Play Ground:</span>
                    {data.isPlayGround ? (
                      <span className="itemValue">Yes</span>
                    ) : (
                      <span className="itemValue">No</span>
                    )}
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

export default SingleList;
