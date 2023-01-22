import "./topBar.scss";
import {
  Search,
  PersonAdd,
  ChatBubble,
  NotificationAdd,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  //   const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="topbarContainer">
      <div onClick={handleClick} className="topbarLeft">
        <span className="logo">Home</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <ChatBubble />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <NotificationAdd />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        {/* <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link> */}
      </div>
    </div>
  );
}
