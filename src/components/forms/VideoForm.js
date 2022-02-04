import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import './style.css';
import { Button, Divider, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core';
import ImageUpload from 'image-upload-react'
import { doc } from 'prettier';
import axios from "axios";
import { PhotoCamera, Videocam } from '@material-ui/icons';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from '@mui/material';

export default function VideoForm() {
    //handle image uploader
    const [imageSrc, setImageSrc] = React.useState("")

    const handleImageSelect = (e) => {
        setImageSrc(URL.createObjectURL(e.target.files[0]))
        setVideo({ ...video, image_src: e.target.files[0] });
    }


    //handle video uploader

    const [link, setLink] = React.useState("Upload Video");

    const handleVideoSelect = (e) => {
        setLink(e.target.files[0].name);
        setVideo({ ...video, url: e.target.files[0] });
    };

    //form building
    const api_url = "http://localhost:8080/vidqr/collections/";
    const api_url_video = "http://localhost:8080/vidqr/video/";
    const [collections, setCollections] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [video, setVideo] = React.useState({
        name: "",
        url: "",
        description: "",
        image_src: null,
        collection: "",
    });

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch(api_url)
            .then(res => res.json())
            .then(json => setCollections(json));
    };
    //handle submit form

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleChangeForm = (e) => {
        e.preventDefault();
        if (e.target.name === "image_src") setVideo({ ...video, image_src: e.target.files[0] });
        else {
            setVideo({ ...video, [e.target.name]: e.target.value });
        }
        console.log("video ", video);
    }

    const handleChangeFormSelect = (e) => {
        e.preventDefault();
        setVideo({ ...video, collection: e.target.value });
        console.log("video ", video);
    }

    const handleSubmitForm = async (e) => {
        setIsLoading(true);
        let image_src = await toBase64(video.image_src);
        let url = await toBase64(video.url);
        image_src = image_src.toString().replace(/^data:(.*,)?/, "");
        url = url.toString().replace(/^data:(.*,)?/, "");
        const { name, collection } = video;
        await axios.post(api_url_video + "savevideo/idCollection/" + collection, { name, url, image_src });
        setIsLoading(false);
    };
    //handle form
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        description: Yup.string().required("description is required"),
        collections: Yup.string().required("please select a collection"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box sx={{ bgcolor: '#fff', height: 'auto', borderRadius: '.90rem' }} >
                    <form>
                        <h1 className='form-title'>Add new Video</h1>
                        <Divider />
                        <h3 className='form-subtitle'>General informations</h3>
                        <Divider />
                        <div className='form-container-fields'>
                            <TextField
                                {...register("name")}
                                error={errors.name ? true : false}
                                onChange={handleChangeForm}
                                className="form-text-field"
                                id="standard-required"
                                label="Video Title"
                                variant="outlined"
                                name="name"
                            />
                            <Typography variant="inherit" className="text-danger">
                                {errors.name?.message}
                            </Typography>
                            <TextField
                                {...register("description")}
                                error={errors.description ? true : false}
                                onChange={handleChangeForm}
                                className="form-text-field"
                                id="standard-required"
                                label="Video Description"
                                variant="outlined"
                                name='description'
                            />
                            <Typography variant="inherit" className="text-danger">
                                {errors.description?.message}
                            </Typography>
                            <InputLabel style={{ width: '50vw' }} id="demo-simple-select-label">collections</InputLabel>
                            <Select
                                {...register("collections")}
                                error={errors.collections ? true : false}
                                style={{ width: '50vw' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="collection"
                                onChange={handleChangeFormSelect}
                                name='collections'
                            >
                                {collections.map((element, i) => {
                                    console.log(element);
                                    // Affichage
                                    return (
                                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>

                                    );
                                })}
                            </Select>
                            <Typography variant="inherit" className="text-danger">
                                {errors.collections?.message}
                            </Typography>
                        </div>
                        <Divider />
                        <h3 className='form-subtitle'>Uploads</h3>
                        <Divider />
                        <div className='form-container-fields'>


                            <ImageUpload
                                name="imageSrc"
                                id="image-upload"
                                className="image-uploader"
                                handleImageSelect={handleImageSelect}
                                imageSrc={imageSrc}
                                setImageSrc={setImageSrc}
                                style={{
                                    width: 250,
                                    height: 200,
                                    background: 'rgb(83 109 254)',
                                    borderRadius: '.90rem'
                                }}
                            />
                            <label className='image-upload-title' htmlFor="image-upload"> Video thumbnail <Typography variant="inherit" className="text-danger">
                                {errors.imageSrc?.message}
                            </Typography>
                            </label>



                            <input
                            
                                name='video'
                                accept="video/*"
                                capture="camcorder"
                                id="icon-button-video"
                                type="file"
                                onChange={handleVideoSelect}
                                className='video-input'
                            />
                            <label htmlFor="icon-button-video">
                                <IconButton color="primary" component="span">
                                    <Videocam />
                                </IconButton>

                                <label className='image-upload-title' htmlFor="image-upload">{link}
                                </label>
                            </label>

                        </div>



                        <div className='form-container-fields '>
                            <Button type='submit' onClick={handleSubmit(handleSubmitForm)} className=' mb-d1 submit-form-button' variant="contained" color='red'>Save video</Button>
                        </div>
                    </form>
                </Box>
            </Container>
        </React.Fragment>
    );
}
