import React, { useState } from "react";
import { Button, Card, CardContent, Container, Grid, TextField } from "@mui/material";
import "./collectionDetail.css";
import qrcode from "qrcode";

const QRCode = ({ id_collection, libelle, collection }) => {
  const [text, setText] = useState(id_collection || "");
  const [imageUrl, setImageUrl] = useState("");
  const getUrlsVideos = () => {
    const jsonString = JSON.stringify(collection);
    console.log("collection ",jsonString)
    return jsonString;
  };
  const generateQrCode = async () => {
    try {
      const response = await qrcode.toDataURL(getUrlsVideos());
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container className="container">
        <Card>
          <h2 className="title">Generate Download QR For collection of {libelle || "Default name"}</h2>
          <CardContent>
            <Grid container spacing={2}>
              <Grid className="grid-center" item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Button className="btn" variant="contained"
                        color="primary" onClick={() => generateQrCode()}>Generate</Button>
                <div className="qr-image-container">
                  {imageUrl ? (
                    <a href={imageUrl} download>
                      <img title="Download the QR Code" src={imageUrl} alt="img" />
                    </a>) : null}
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default QRCode;
