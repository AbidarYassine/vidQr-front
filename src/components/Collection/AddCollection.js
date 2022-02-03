import React from "react";
import "./index.css";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const AddCollection = () => {
  // const validationSchema = Yup.object().shape({
  //   name: Yup.string()
  //     .required("name is required")
  //     .min(6, "name must be at least 6 characters")
  //     .max(20, "name must not exceed 20 characters"),
  //   description: Yup.string()
  //     .required("description is required")
  //     .min(20, "description must be at least 6 characters")
  //     .max(400, "description must not exceed 40 characters"),
  // });
  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  // });
  // const onSubmit = data => {
  //   console.log(JSON.stringify(data, null, 2));
  // };
  // const card = (
  //   <React.Fragment>
  //     <CardContent>
  //       <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
  //         Add Collection
  //       </Typography>
  //       <div className="form-container-fields">
  //         <form>
  //           <Controller
  //             name={"textValue"}
  //             control={control}
  //             render={({ field: { onChange, value } }) => (
  //               <TextField onChange={onChange} value={value} label={"Text Value"} />
  //             )}
  //           />
  //           <TextField
  //             {...register("name")}
  //             error={errors.name ? true : false}
  //             className="form-text-field"
  //             name="name" label="Collection Name"
  //             variant="outlined" />
  //
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             onClick={handleSubmit(onSubmit)}
  //           >
  //             Register
  //           </Button>
  //         </form>
  //       </div>
  //     </CardContent>
  //   </React.Fragment>
  // );
  // return (
  //   <>
  //     <Card variant="outlined">
  //       {card}
  //     </Card>
  //   </>
  // );
};

export default AddCollection;
