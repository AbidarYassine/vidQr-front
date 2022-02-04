import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, useHistory, useParams } from "react-router-dom";

import "../collectionDetail.css";
import { Card, CardContent, CardMedia, CircularProgress, Container, Grid, Typography } from "@mui/material";
import QRCode from "../QrCode";

const api = "http://localhost:8080/vidqr/collections/";
export default function VideoDetails() {
    const history = useHistory();

    const [video, setVideo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let { name, collection } = useParams();
    const getData = async () => {
        console.log(11111111111111111111)
        console.log(name)
        console.log(collection)
        console.log(11111111111111111111)
        setIsLoading(true);
        const token = localStorage.getItem("token");
        console.log("Token ", token);
        const res = await axios.get(`${api}id/${collection}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        res?.data.videos?.map(videoTemp => {
            console.log(videoTemp.name)
            if (videoTemp.name == name) {
                setVideo(videoTemp);

            }
        })

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
        /* eslint no-restricted-globals:0 */
        Redirect(`/app/detail/video/${name}`);
    }
    return (
        <>
            <Container className="container">
                <div className="collection-image-container">
                    <img src={video?.image_src} alt="No Image" />
                </div>
            </Container>
            <Container className="container">
                <Card>
                    <h2
                        className="title"> Preview the video : {video?.name} </h2>
                    <CardContent>
                        <CardMedia
                        className="card-media-video"
                            component="video"
                            autoPlay
                            controls
                            src={video?.url}
                        />
                    </CardContent>

                </Card>
            </Container>
            <QRCode id_collection={video.name} collection={video} libelle={video.name} />
        </>
    )
}
