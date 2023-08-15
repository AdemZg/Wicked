export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Full Name",
    width: 300,
  },
  {
    field: "email",
    headerName: "Email",
    width: 330,
  },

  {
    field: "mobile",
    headerName: "Mobile",
    width: 280,
  },
  {
    field: "blocked",
    headerName: "Blocked",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.blocked === false ? 'No' : 'Yes' }
        </div>
      );
    },
  },
];
export const userColumnsBrands = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Brand",
    width: 760,
  },
];
export const userColumnsPcats = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Category",
    width: 760,
  },
];
export const userColumnsBlogcats = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Category",
    width: 760,
  },
];
export const userColumnsColors = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Color",
    width: 760,
  },
];
export const userColumnsBlog = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 300,
  },
  {
    field: "category",
    headerName: "Category",
    width: 300,
  },

  {
    field: "author",
    headerName: "Author",
    width: 252,
  },
  {
    field: "views",
    headerName: "Views",
    width:150,
  },
];

export const userColumnsProduct = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 200,
  },
  {
    field: "category",
    headerName: "Category",
    width: 202,
  },
    {
    field: "sold",
    headerName: "Sold",
    width: 170,
  },
    {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
  },
    {
    field: "price",
    headerName: "Price",
    width: 150,
  },
];
export const userColumnsEnq = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Full Name",
    width: 262,
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },

  {
    field: "mobile",
    headerName: "Mobile",
    width: 280,
  },
];
export const userColumnsOrders = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "date",
    headerName: "Order Date",
    width: 350,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {new Date(params.row.date).toUTCString()}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Customer Info",
    width: 250,
  },

  {
    field: "amount",
    headerName: "Total Amount",
    width: 200,
  },

];
export const userColumnsCoupons = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Coupon Name",
    width: 350,
  },

  {
    field: "discount",
    headerName: "Discount",
    width: 300,
  },
  {
    field: "expiry",
    headerName: "Expiry Date",
    width: 372,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {new Date(params.row.expiry).toLocaleDateString()}
        </div>
      );
    },
  },
];
//if neeeded tal9ani lena
