import DatatableTicket from "../../components/datatableTicket/DatatableTicket";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./tickets.scss";

function Tickets() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableTicket />
      </div>
    </div>
  );
}

export default Tickets;
