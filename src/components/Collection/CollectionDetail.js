import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, useHistory, useParams } from "react-router-dom";
import QRCode from "./QrCode";
import "./collectionDetail.css";
import { Button, Card, CardContent, CircularProgress, Container, Grid, Typography } from "@mui/material";


const api = "http://localhost:8080/vidqr/collections/";

const CollectionDetail = () => {
  const history = useHistory();
  const [collection, setCollection] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();
  console.log("id ", id);
  const getData = async () => {
    setIsLoading(true);
    const res = await axios.get(`${api}id/${id}`);
    setCollection(res.data);
    console.log("res ", res);
    setIsLoading(false);
  };
  useEffect(() => {
    getData();

  }, []);
  if (isLoading) return (
    <>
      <CircularProgress size={30}
        sx={{
          color: "#06b0ac",
          zIndex: 1,
        }} />
      <h2>Loading ...</h2>
    </>
  );
  const forwardToDetail = (name) => {
    console.log(name)
    /* eslint no-restricted-globals:0 */

  }
  return (
    <>
      <Container className="container">
        <div className="collection-image-container">
          <img src={collection?.image_src} alt="No Image" />
        </div>
      </Container>
      <Container className="container">
        <Card>
          <h2
            className="title"> {collection?.name} : {collection?.videos?.length} {collection?.videos?.length === 0 ? "Empty Collection" : collection.videos?.length === 1 ? "Video" : "Videos"} </h2>
          <CardContent>
            <Typography>{collection?.description}</Typography>
          </CardContent>
          <Grid className="container" spacing={3}>
            {
              collection?.videos?.map(video => {
                return (
                  <Grid key={video.name} className="container-video" item xs={6} md={4}>
                    <img  onClick={() => { Redirect(`/app/detail/video/${video.name}`) }} src={video.image_src} alt="" />
                    <h3 style={{ justifyContent: "center" }}>{video.name}</h3>
                    <Button onClick={() => {
                      console.log(1223322)
                        history.push(`/app/detail/collection/${collection.id}/video/${video.name}`);
                   
                    }} variant="outlined">Detail</Button>
                  </Grid>
                );
              })
            }
          </Grid>
        </Card>
      </Container>
      <QRCode id_collection={collection.id} collection={collection} libelle={collection.name} />
    </>
  );
};

export default CollectionDetail;
