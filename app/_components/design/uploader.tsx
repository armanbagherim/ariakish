import React, { useCallback, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Box, Typography, LinearProgress } from "@mui/material";
import Image from "next/image";

const Uploader = ({
  id,
  location,
  refetch,
  text = "آپلود تصویر",
  type = "image",
  formik,
  formikFieldName,
}) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photo, setPhoto] = useState(null);
  const statusRef = useRef();
  const loadTotalRef = useRef();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const validFiles = acceptedFiles.filter((file) => {
        const isValidImage =
          type === "image" && /^image\/(jpeg|png|gif|webp)$/.test(file.type);
        const isValidVideo =
          type === "video" && /^video\/(mp4|avi|mov)$/.test(file.type);
        return isValidImage || isValidVideo;
      });

      if (validFiles.length === 0) {
        toast.error("فایل معتبر انتخاب نشده است.");
        return;
      }

      const previewFiles = validFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles(previewFiles);
      await uploadFiles(previewFiles);
    },
    [type]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      type === "image"
        ? {
            "image/jpeg": [],
            "image/png": [],
            "image/gif": [],
            "image/webp": [],
          }
        : {
            "video/mp4": [],
            "video/avi": [],
            "video/mov": [],
          },
    noClick: false,
    noKeyboard: true,
  });

  const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/${location}${
          id ? `/${id}` : ""
        }`
      );

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setProgress(percentComplete);
          if (loadTotalRef.current) {
            loadTotalRef.current.innerHTML = `${e.loaded} آپلود شده از ${e.total}`;
          }
          if (statusRef.current) {
            statusRef.current.innerHTML = `${Math.round(
              percentComplete
            )}% آپلود شد...`;
          }
        }
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error("Upload failed"));
        }
      };

      xhr.onerror = () => reject(new Error("Upload failed"));
      xhr.send(formData);
    });
  };

  const uploadFiles = async (selectedFiles) => {
    setUploading(true);
    setProgress(0);

    for (let file of selectedFiles) {
      try {
        const result = await uploadFile(file);
        toast.success(`${file.name} با موفقیت آپلود شد`);

        const uploadedId = +result.result.id;
        const uploadedFileName = result.result.fileName;

        setPhoto({ id: uploadedId, fileName: uploadedFileName });

        if (formik && formikFieldName) {
          formik.setFieldValue(formikFieldName, uploadedId);
        }

        if (refetch) refetch();
      } catch (error) {
        toast.error(`آپلود ${file.name} ناموفق بود`);
      }
    }

    setUploading(false);
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const error =
    formik.touched[formikFieldName] && !formik.values[formikFieldName];

  return (
    <Box className="space-y-4">
      <Box
        {...getRootProps()}
        sx={{
          border: `2px dashed ${error ? "red" : "#ccc"}`,
          borderRadius: "8px",
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#fafafa",
          transition: "background 0.2s ease",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <input {...getInputProps()} multiple />
        <Typography variant="body2" color="textSecondary">
          برای {text} کلیک کنید یا فایل را بکشید و رها کنید
        </Typography>
        {error && (
          <Typography color="red" variant="body2">
            فایل {text} الزامی است.
          </Typography>
        )}
      </Box>

      {/* پیش نمایش تصویر */}
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {files.map((file) => (
            <div className="w-full">
              <Image
                className="rounded-lg w-full h-[100px] object-cover"
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
          ))}
        </Box>
      )}

      {uploading && (
        <Box sx={{ p: 2, border: "1px solid #eee", borderRadius: "8px" }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" mt={1} ref={statusRef} />
          <Typography
            variant="caption"
            color="text.secondary"
            ref={loadTotalRef}
          />
        </Box>
      )}
    </Box>
  );
};

export default Uploader;
