import "./EditProfile.css";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { modeContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
function EditProfile() {

  

  const { colorMode, setColorMode } = useContext(modeContext);

  const form = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      username:"",
      password:"",
      email: "",
      phone: "",
      licenses: [
        {
          onelicenses: "",
        },
      ],
    },
  });

  const { register, control, handleSubmit, formState, setValue, reset } = form;
  const { errors } = formState;

  const {fields: licensesFields,append: appendlicenses,remove: removelicenses,} = useFieldArray({
    name: "licenses",
    control,
  });

  const onSubmit = (data) => {
    console.log("form submit!!!!!", data);
  };
 
  return (
    <div className="info-container">
      <form className="info-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="info-heading">EditProfile</h2>

        <div className="all-div-of-label">

        <div className="solo-info-container">
        <TextField className="info-input" label="First name" id="firstname"{...register("firstname", { required: "firstname is required" })}/>
        <p className="info-error">{errors.firstname?.message}</p>
        </div>

        <div className="solo-info-container">
        <TextField className="info-input" label="Last name" id="lastname"{...register("lastname", { required: "lastname is required" })}/>
        <p className="info-error">{errors.lastname?.message}</p>
        </div>

        <div className="solo-info-container">
        <TextField className="info-input" label="User name" id="username"{...register("username", { required: "username is required" })}/>
        <p className="info-error">{errors.username?.message}</p>
        </div>

        <div className="solo-info-container">
        <TextField className="info-input" label="Password" id="password"{...register("password", { required: "password is required" })}/>
        <p className="info-error">{errors.password?.message}</p>
        </div>

        <div className="solo-info-container">
        <TextField className="info-input" label="Phone number" id="phonenumber"{...register("phonenumber", { required: "phonenumber is required" })}/>
        <p className="info-error">{errors.phonenumber?.message}</p>
        </div>
         

        <div className="solo-info-container">
        <TextField className="info-input"  label="Email " id="email" {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, //i need to add that empty is also not good
              message: "Invalid email format",
            },
            validate: (fieldValue) => {
              return ( 
                fieldValue !== "admin@example.com" ||
                "enter a different email address"
              );
            },
          })}
        />
        <p className="info-error">{errors.email?.message}</p>
        </div>

        <div className="solo-info-container">
      
        <div>
          {licensesFields.map((field, index) => {
            return (
              <div key={field.index}>
                <TextField className="info-input" label={`license No. ${index+1}`} placeholder="enter one license..."{...register(`licenses.${index}.onelicenses`, {required: "onelicenses is required",})}/>
                {index > 0 && (
                  <button className="info-button-delete" type="button" onClick={() => removelicenses(index)}>-</button>
                )}
                <p className="info-error">{errors.licenses?.[index]?.onelicenses?.message}</p>
              </div>
              
            );
          })}
          <button className="info-button-add" type="button" onClick={() =>licensesFields.length < 5 &&appendlicenses({onelicenses: ""})}>+</button>
        </div>
        </div>
       
        <button className="submit-button" id="submit-css">Submit</button>

        </div>

      </form>
      <DevTool control={control}></DevTool>
    </div>
  );
}
export default EditProfile;
