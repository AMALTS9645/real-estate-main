import "./datatableTicket.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ticketColumns } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../components/hooks/useFetch";
import axios from "axios";

const DatatableTicket = ({ heading }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/${path}/all`
  );

  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${path}/${id}`);
      // setList(land.filter((item) => item._id !== id));
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleRoute = () => {
          navigate(`/${path}/${params.id}`, {
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

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Tickets
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={ticketColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default DatatableTicket;
