import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" name="users" />
          <Widget type="house" name="houses" />
          <Widget type="land" name="lands" />
          <Widget type="payment" name="payments" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Payment Status" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Last 5 Added Houses</div>
          <Table type="list" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Last 5 Added Lands</div>
          <Table type="land" />
        </div>
      </div>
    </div>
  );
};

export default Home;
