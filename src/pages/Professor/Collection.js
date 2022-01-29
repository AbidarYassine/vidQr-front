import PageTitle from "../../components/PageTitle";
import { Avatar, Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

const url = "https://fakestoreapi.com/products/";
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: "auto",
  },
}));
const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
];
export default function Collection() {


  const [collections, setCollections] = useState([]);
  const getData = () => {
    fetch(url)
      .then(res => res.json())
      .then(json => setCollections(json));
  };
  const columns = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: true,
        sort: true,
      },
    }, {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    }, {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "image",
      label: "Image",
      options: {
        customBodyRender: (image) => {
          return (
            <Avatar variant="rounded" src={image}>
            </Avatar>
          );
        },
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <PageTitle title="Toutes les collections" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Collection List"
            data={collections}
            columns={
              columns
            }
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
