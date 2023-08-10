import "./EditProfile.css";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { modeContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { HOST } from "../../Utils/host";
function EditProfile() {
  const { colorMode, setColorMode,setForRestart,forRestart } = useContext(modeContext);
  const [data, setData] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    axios
      .post(`${HOST}/user/translateToken`, {
        token: localStorage.getItem("loggedUser"),
      })
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log(err.message));
  }, []);


  const form = useForm({
    defaultValues: {
      firstName: "",
      lastNme: "",
      username: "",
      email: "",
      phone: "",
      licensePlates: [
        {
          onelicenses: "",
        },
      ],
    },
  });

  useEffect(() => {
    data.licensePlates = data?.licensePlates?.map(v => {
      return {onelicenses: v}
    })
    reset(data);
  }, [data]);

  const onFocus = () => {
    setValue('firstName', ''); 
  };
  const { register, control, handleSubmit, formState, setValue, reset } = form;
  const { errors } = formState;

  const {
    fields: licensesFields,
    append: appendlicenses,
    remove: removelicenses,
  } = useFieldArray({
    name: "licensePlates",
    control,
  });
  

  const onSubmit = (data) => {
    console.log(data, "dd");
    data.licensePlates = data.licensePlates.map(v => v.onelicenses)
    axios 
    .patch(`${HOST}/user/updateUser`,data)
    .then(({ data }) => {
      console.log(data);
       alert("User edited successefully!")
    updateLicense(data)
    navigate("/Profile")
    setForRestart(!forRestart)
    })
    .catch((err) => 
    console.log(err.response.data));

   
  };

  const updateLicense = (data) => {
    const license = data?.licensePlates.length;
    const doesIndexExist = data?.licensePlates.findIndex(item => item === data?.activeLicense);

    const data1 = {
      activeLicense: doesIndexExist === -1 ? data?.licensePlates[license - 1] : data?.activeLicense,
      _id: data?._id,
    };

    axios
      .patch(`${HOST}/user/updatelicense`, data1)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err.response.data));
  };


  return (
    <div className="info-container">
      <form className="info-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="info-heading">Edit Profile</h1>

        <div className="all-div-of-label">
          <div className="solo-info-container">
            <div className="title-input">First name:</div>
            <input
              className="info-input"
              label="First name"
              onFocus={onfocus}
              id="firstName"
              {...register("firstName", { required: "firstname is required" })}
            />
            <p className="info-error">{errors.firstName?.message}</p>
          </div>

          <div className="solo-info-container">
            <div className="title-input">Last name:</div>
            <input
              className="info-input"
              defaultValue={data.lastName}
              label="Last name"
              id="lastName"
              {...register("lastName", { required: "lastname is required" })}
            />
            <p className="info-error">{errors.lastName?.message}</p>
          </div>

          <div className="solo-info-container">
            <div className="title-input">User Name:</div>
            <input
              className="info-input"
              defaultValue={data.username}
              label="User name"
              id="username"
              {...register("username", { required: "username is required" })}
            />
            <p className="info-error">{errors.username?.message}</p>
          </div>

          <div className="solo-info-container">
            <div className="title-input">Phone Number:</div>
            <input
              className="info-input"
              defaultValue={data.phoneNumber}
              label="Phone number"
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "phonenumber is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Invalid phone number. Please use only numbers.",
                },
              })}
            />
            <p className="info-error">{errors.phoneNumber?.message}</p>
          </div>

          <div className="solo-info-container">
            <div className="title-input">Email:</div>
            <input
              className="info-input"
              defaultValue={data.email}
              label="Email "
              id="email"
              {...register("email", {
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
              {licensesFields?.map((field, index) => {
                return (
                  <div key={field.index}>
                    <div className="title-input">License Plates No.{index+1}:</div>
                    <div className="input-and-minus">
                    <input
                      className="info-input"
                      label={`license No. ${index + 1}`}
                      placeholder="enter one license..."
                      maxLength="8"
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ''); 
                      }}
                      {...register(`licensePlates.${index}.onelicenses`, {
                        required: "license Plate is required",
                      })}
                    />
                    {index > 0 && (
                      <button
                        className="info-button-delete"
                        type="button"
                        onClick={() => removelicenses(index)}
                      >
                        -
                      </button>
                    )}
                    </div>
                    <p className="info-error">
                      {errors.licenses?.[index]?.onelicenses?.message}
                    </p>
                  </div>
                );
              })}
              <button
                className="info-button-add"
                type="button"
                onClick={() =>
                  licensesFields.length < 3 &&
                  appendlicenses({ onelicenses: "" })
                }
              >
                +
              </button>
            </div>
          </div>

          <button className="submit-button" id="submit-css">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditProfile;
