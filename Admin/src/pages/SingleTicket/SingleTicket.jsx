import "./singleTicket.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { format } from "timeago.js";
import { useRef } from "react";
import TicketChat from "../../components/TicketChat/TicketChat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleTicket() {
  const scrollRef = useRef();
  const params = useParams();
  const [info, setInfo] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const handleTickets = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/tickets/all/${params.id}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleTickets();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async () => {
    // e.preventDefault();
    try {
      const newMessage = {
        conversations: [
          {
            sender: "",
            ...info,
          },
        ],
      };
      await axios.put(
        `http://localhost:8080/api/tickets/reply/${params.id}`,
        newMessage
      );
      toast.success("Message Sent", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.reload();
      // setopen(false);
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
  //   console.log(data)
  return (
    <>
      <div className="list">
        <Sidebar />
        <ToastContainer />
        <div className="listContainer">
          <Navbar />
          <div className="ticketDet">
            <div className="ticketDec">
              <div className="tktDetail">
                <p className="subject">Problem : </p>
                {data?.subject}
              </div>
              <div className="tktDetail">
                <p className="subject">Status : </p>
                {data?.status}
              </div>
              <div className="tktDetail">
                <p className="subject">Issue Found On : </p>
                {format(data?.openAt)}
              </div>
              <div className="tktDetail">
                <p className="subject">Posted On : </p>
                {format(data?.foundAt)}
              </div>
              <div className="tktDetail">
                <p className="subject">Details : </p>
                {data?.details}
              </div>
            </div>
            <div className="chatWindow">
              <div className="msgHead">
                <div className="fromMe">Message From User</div>
                <div className="fromMe">Your Reply</div>
              </div>
              <div className="tktConversation">
                {data?.conversations.map((m) => (
                  <div ref={scrollRef} key={m._id}>
                    <TicketChat message={m} own={m.sender === data?.clientId} />
                  </div>
                ))}
              </div>
            </div>
            <div className="textMsg">
              Write
              <textarea
                id="message"
                name="det"
                className="chatText"
                type="textarea"
                placeholder="Write....."
                required
                onChange={handleChange}
              ></textarea>
              <div className="sendButtonTkt">
                <button onClick={handleClick} className="sendTkt">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleTicket;
