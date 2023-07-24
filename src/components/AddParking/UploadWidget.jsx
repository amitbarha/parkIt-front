import { useEffect, useState, useRef } from "react";
import './upload-widget.css'
function UploadWidget() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "deiofeueo",
        uploadPresent: "zpfmjchg",
      },
      function (error, result) {
        console.log(result);
      }
    );
  });
  return(
  
    <div className="upload-image-button" onClick={() => widgetRef.current.open()}>upload</div>

  )
}

export default UploadWidget;
