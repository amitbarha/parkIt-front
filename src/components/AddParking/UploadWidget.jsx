import { useEffect, useState, useRef, useContext } from "react";
import "./upload-widget.css";
import { CloudinaryContext } from "../../App";
function UploadWidget({ onPhotoChange }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const { cloudinaryImg, setCloudinaryImg } = useContext(CloudinaryContext);
  const arrImg = []

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "deiofeueo",
        uploadPreset: "zpfmjchg",
      },
      function (err, results) {
        if (!err && results && results.event == "success") {
          arrImg.push(results.info.url)
             setCloudinaryImg(arrImg)
        }
      },

      
    );
  },[]);

  
  return (
    <button type="button"
      className="upload-image-button"
      onClick={() => widgetRef.current.open()}
    >
            <div><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/FFFFFF/image.png" alt="image"/></div>
      <div>Upload Image</div>
    </button>
  );
}

export default UploadWidget;
