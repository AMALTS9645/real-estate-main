export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "firstName",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.firstName} {params.row.lastName}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const houseColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },

  {
    field: "address",
    headerName: "Address",
    width: 150,
  },
  {
    field: "distance",
    headerName: "Distance",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 100,
  },
  {
    field: "bedRoom",
    headerName: "BedRoom",
    width: 100,
  },
  {
    field: "bathRoom",
    headerName: "BathRoom",
    width: 100,
  },
  {
    field: "balcony",
    headerName: "Balcony",
    width: 100,
  },
  {
    field: "furnishing",
    headerName: "Furnishing",
    width: 100,
  },
  {
    field: "facing",
    headerName: "Facing",
    width: 100,
  },
  {
    field: "floors",
    headerName: "Floors",
    width: 100,
  },
  {
    field: "plotArea",
    headerName: "PlotArea(cent)",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
];

export const landColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },

  {
    field: "distance",
    headerName: "Distance",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 100,
  },
  {
    field: "plotArea",
    headerName: "PlotArea",
    width: 100,
  },
  {
    field: "facing",
    headerName: "Facing",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
];

export const paymentColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "orderId",
    headerName: "Order Id",
    width: 230,
  },
  {
    field: "paymentId",
    headerName: "Payment Id",
    width: 210,
  },
  {
    field: "signature",
    headerName: "Signature",
    width: 400,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
  },
];

export const ticketColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "subject",
    headerName: "Subjects",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 210,
  },
  {
    field: "openAt",
    headerName: "Opened Date",
    width: 400,
  },
];
