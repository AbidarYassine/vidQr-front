import PageTitle from "../../components/PageTitle";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Slide,
  TextField,
} from "@mui/material";
import "./collection.css";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ArrowBack as CloseIcon } from "@material-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import ImageUpload from "image-upload-react";
import DialogCollection from "../../components/Dialogs/DialogCollection";
import VideoForm from "../../components/forms/VideoForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const api = "http://localhost:8081/vidqr/collections/";

export default function Collection() {

  const history = useHistory();
  const [collections, setCollections] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAddVideo, setOpenAddVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [video, setVideo] = useState({
    name: "",
    description: "",
    image_src: null,
  });
  const [selectedItem, setSelectedItem] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "image_src") setVideo({ ...video, image_src: e.target.files[0] });
    else {
      setVideo({ ...video, [e.target.name]: e.target.value });
    }
    console.log("video ", video);
  };
  const handleDialog = () => {
    setOpen(!open);
  };
  const handleDialogAddVideo = () => {
    setOpenAddVideo(!openAddVideo);
  };
  const getData = async () => {
    const token = localStorage.getItem("token");
    console.log("Token ", token);
    const res = await axios.get(api, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    setCollections(res.data);
  };
  const columns = [
    {
      name: "image_src",
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
    {
      name: "name",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string().required("description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("data ", data);
    let image_src = await toBase64(video.image_src);
    image_src = image_src.toString().replace(/^data:(.*,)?/, "");
    const { name, description } = video;
    await axios.post(api, { name, description, image_src });
    setIsLoading(false);
    setOpen(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]));
    setVideo({ ...video, image_src: e.target.files[0] });
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
          Add Collection
        </Typography>
        <div className="form-container-fields-collection">
          <form>
            <TextField
              required
              id="name"
              margin="dense"
              {...register("name")}
              error={errors.name ? true : false}
              onChange={handleChange} className="form-text-field" name="name" label="Collection Name"
              variant="outlined" />
            <Typography variant="inherit" className="text-danger">
              {errors.name?.message}
            </Typography>
            <TextField
              margin="dense"
              {...register("description")}
              error={errors.description ? true : false}
              onChange={handleChange} type="textArea" name="description" className="form-text-field"
              label="Description"
              variant="outlined" />
            <Typography variant="inherit" className="text-danger">
              {errors.description?.message}
            </Typography>
            <ImageUpload
              id="image-upload"
              className="image-uploader "
              handleImageSelect={handleImageSelect}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              style={{
                width: 250,
                height: 200,
                background: "rgb(83 109 254)",
                borderRadius: ".90rem",
              }}
            />
          </form>
        </div>
        <div className="btn-container-center">
          <Button style={{
            marginTop: "40px",
          }} type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-block">
            {
              isLoading ? <CircularProgress size={30}
                                            sx={{
                                              color: "#dce9dd",
                                              position: "absolute",
                                              top: 4,
                                              left: 336,
                                              zIndex: 1,
                                            }} />
                : (
                  <p>Save</p>
                )
            }
          </Button>
        </div>
      </CardContent>
    </React.Fragment>
  );
  const cardAddVideo = (
    <React.Fragment>
      <CardContent>
        <VideoForm />
      </CardContent>
    </React.Fragment>
  );
  return (
    <>
      <PageTitle title="All the collections" />
      <Stack className="btn-container" spacing={2} direction="row">
        <Button onClick={handleDialog} variant="outlined">Add Collection</Button>
        {
          selectedItem.length > 0 && (
            <Button onClick={() => {
              if (selectedItem.length > 1) {
                alert("Plz select one element ");
              } else {
                history.push(`/app/detail/collections/${collections[selectedItem[0]].id}`);
              }
            }} variant="outlined">Detail</Button>
          )
        }
        <Button onClick={handleDialogAddVideo} variant="outlined">Add Videos</Button>
      </Stack>
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
              multiple: false,
              onRowSelectionChange: (items, allRowsSelected, rowsSelected) => {
                setSelectedItem(rowsSelected);
                console.log("selected item ", selectedItem);
              },
            }}
          />
        </Grid>
      </Grid>
      <DialogCollection card={cardAddVideo} open={openAddVideo} handleDialog={handleDialogAddVideo}
                        transition={Transition} />

      <DialogCollection card={card} open={open} handleDialog={handleDialog} transition={Transition} />
    </>
  );
}
