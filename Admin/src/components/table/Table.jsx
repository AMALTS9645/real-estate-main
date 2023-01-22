import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const List = ({ type }) => {
  const [newList, setNewList] = useState([]);
  const [newLand, setNewLand] = useState([]);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/houses/findlatest?new=true"
        );
        setNewList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, []);

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/lands/findlatest?new=true"
        );
        setNewLand(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, []);

  // console.log(newLand)

  return (
    <>
      {type === "list" && (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Listed By</TableCell>
                <TableCell className="tableCell">City</TableCell>
                <TableCell className="tableCell">Address</TableCell>
                <TableCell className="tableCell">Distance</TableCell>
                <TableCell className="tableCell">Title</TableCell>
                <TableCell className="tableCell">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newList.map((row) => (
                <TableRow style={{ cursor: "pointer" }} key={row._id}>
                  <TableCell className="tableCell">{row.name}</TableCell>
                  <TableCell className="tableCell">{row.listedBy}</TableCell>
                  <TableCell className="tableCell">{row.city}</TableCell>
                  <TableCell className="tableCell">{row.address}</TableCell>
                  <TableCell className="tableCell">{row.distance}</TableCell>
                  <TableCell className="tableCell">{row.title}</TableCell>
                  <TableCell className="tableCell">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {type === "land" && (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Listed By</TableCell>
                <TableCell className="tableCell">City</TableCell>
                <TableCell className="tableCell">Address</TableCell>
                <TableCell className="tableCell">Distance</TableCell>
                <TableCell className="tableCell">Title</TableCell>
                <TableCell className="tableCell">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newLand.map((row) => (
                <TableRow style={{ cursor: "pointer" }} key={row._id}>
                  <TableCell className="tableCell">{row.name}</TableCell>
                  <TableCell className="tableCell">{row.listedBy}</TableCell>
                  <TableCell className="tableCell">{row.city}</TableCell>
                  <TableCell className="tableCell">{row.address}</TableCell>
                  <TableCell className="tableCell">{row.distance}</TableCell>
                  <TableCell className="tableCell">{row.title}</TableCell>
                  <TableCell className="tableCell">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default List;
