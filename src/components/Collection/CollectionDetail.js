import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QRCode from "./QrCode";
import "./collectionDetail.css";
import { Card, CardContent, CircularProgress, Container, Typography } from "@mui/material";


const api = "http://localhost:8080/vidqr/collections/";

const CollectionDetail = () => {
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
        </Card>
      </Container>
      <QRCode id_collection={collection.id} videos={collection?.videos} libelle={collection.name} />
    </>
  );
};

// const useStyles = makeStyles((theme) => ({
//   conatiner: {
//     marginTop: 10
//   },
//   title: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems:  'center',
//     background: '#3f51b5',
//     color: '#fff',
//     padding: 20
//   },
//   btn : {
//     marginTop: 10,
//     marginBottom: 20
//   }
// }));
export default CollectionDetail;
