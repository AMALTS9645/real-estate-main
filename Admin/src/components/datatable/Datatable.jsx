import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  houseColumns,
  landColumns,
  paymentColumns,
  userColumns,
} from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../components/hooks/useFetch";
import axios from "axios";

const Datatable = ({ heading }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  // const [land, setLand] = useState();

  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/${path}`
  );

  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  // console.log(list[0].razorpay.orderId)

  // console.log(list)
  // const AllLands = () => {
  //   const { data, loading, error } = useFetch(
  //     "http://localhost:8080/api/lands"
  //   );
  //   return data;
  // };

  // const lands = AllLands();

  // useEffect(() => {
  //   setLand(lands);
  // }, [lands]);

  // const AllHouses = () => {
  //   const { data, loading, error } = useFetch(
  //     "http://localhost:8080/api/houses"
  //   );
  //   return data;
  // };

  // const houses = AllHouses();
  // const [userdata, setData] = useState(userRows);
  // const [housedata, setHouseData] = useState(userRows);
  // const [landdata, setLandData] = useState(userRows);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${path}/${id}`);
      // setList(land.filter((item) => item._id !== id));
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleRoute = () => {
          navigate(`/${path}/${params.id}`, {
            state: { list },
          });
        };
        // console.log(params)
        return (
          <div className="cellAction">
            <div
              onClick={handleRoute}
              style={{ textDecoration: "none" }}
              className="viewButton"
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const actionColumnPayment = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {heading === "Add New User" && (
        <div className="datatable">
          <div className="datatableTitle">
            Users
            <Link to="/users/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={list}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
      )}

      {heading === "Add New House" && (
        <div className="datatable">
          <div className="datatableTitle">
            Houses
            <Link to="/houses/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={list}
            columns={houseColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
      )}

      {heading === "Add New Land" && (
        <div className="datatable">
          <div className="datatableTitle">
            Lands
            <Link to="/lands/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={list}
            columns={landColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
      )}

      {heading === "Add New Payment" && (
        <div className="datatable">
          <div className="datatableTitle">Payments</div>
          <DataGrid
            className="datagrid"
            rows={list}
            columns={paymentColumns.concat(actionColumnPayment)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </div>
      )}
    </>
  );
};

export default Datatable;
