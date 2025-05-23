import React, { useCallback, useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Box, Typography, LinearProgress, IconButton } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { MdDelete } from "react-icons/md";

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
  const [isDragActive, setIsDragActive] = useState(false);
  const statusRef = useRef();
  const loadTotalRef = useRef();
  const inputRef = useRef();
  const cancelTokenSourceRef = useRef(null); // Store Axios cancel token

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      await processFiles(droppedFiles);
    },
    [type]
  );

  const handleFileChange = useCallback(
    async (e) => {
      const selectedFiles = Array.from(e.target.files);
      await processFiles(selectedFiles);
    },
    [type]
  );

  const handleRemoveFile = useCallback(() => {
    // Cancel ongoing upload if it exists
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel("Upload cancelled by user");
      cancelTokenSourceRef.current = null;
    }

    // Clear files and photo state
    setFiles([]);
    setPhoto(null);

    // Reset upload states
    setUploading(false);
    setProgress(0);
    if (statusRef.current) {
      statusRef.current.innerHTML = "";
    }
    if (loadTotalRef.current) {
      loadTotalRef.current.innerHTML = "";
    }

    // Reset Formik field value
    if (formik && formikFieldName) {
      formik.setFieldValue(formikFieldName, null);
    }

    toast.info("فایل حذف شد. می‌توانید فایل جدیدی آپلود کنید.");
  }, [formik, formikFieldName]);

  const processFiles = async (acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => {
      const fileType = file.type.toLowerCase();
      if (type === "image") {
        return (
          fileType === "image/jpeg" ||
          fileType === "image/png" ||
          fileType === "image/gif" ||
          fileType === "image/webp"
        );
      } else if (type === "video") {
        return (
          fileType === "video/mp4" ||
          fileType === "video/avi" ||
          fileType === "video/mov"
        );
      }
      return false;
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
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    // Create a new cancel token source
    cancelTokenSourceRef.current = axios.CancelToken.source();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/${location}${id ? `/${id}` : ""
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          cancelToken: cancelTokenSourceRef.current.token,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const percentComplete =
                (progressEvent.loaded / progressEvent.total) * 100;
              setProgress(percentComplete);
              if (loadTotalRef.current) {
                loadTotalRef.current.innerHTML = `${progressEvent.loaded} آپلود شده از ${progressEvent.total}`;
              }
              if (statusRef.current) {
                statusRef.current.innerHTML = `${Math.round(
                  percentComplete
                )}% آپلود شد...`;
              }
            }
          },
        }
      );

      // Clear cancel token after successful upload
      cancelTokenSourceRef.current = null;
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Upload cancelled:", error.message);
      } else {
        console.error("Upload Error:", {
          message: error.message,
          response: error.response
            ? {
              status: error.response.status,
              statusText: error.response.statusText,
              data: error.response.data,
            }
            : "No response received",
        });
        throw error;
      }
    }
  };

  const uploadFiles = async (selectedFiles) => {
    setUploading(true);
    setProgress(0);

    try {
      const result = await uploadFile(selectedFiles[0]);
      toast.success(`${selectedFiles[0].name} با موفقیت آپلود شد`);

      const uploadedId = +result.result.id;
      const uploadedFileName = result.result.fileName;

      setPhoto({ id: uploadedId, fileName: uploadedFileName });

      if (formik && formikFieldName) {
        formik.setFieldValue(formikFieldName, uploadedId);
      }

      if (refetch) refetch();
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Upload Error:", error);
        toast.error(`آپلود ${selectedFiles[0].name} ناموفق بود`);
      }
    } finally {
      setUploading(false);
      setProgress(0);
      if (statusRef.current) {
        statusRef.current.innerHTML = "";
      }
      if (loadTotalRef.current) {
        loadTotalRef.current.innerHTML = "";
      }
    }
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const error =
    formik.touched[formikFieldName] && !formik.values[formikFieldName];

  return (
    <Box className="space-y-4">
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
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
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          accept={
            type === "image"
              ? "image/jpeg,image/png,image/gif,image/webp"
              : "video/mp4,video/avi,video/mov"
          }
          onChange={handleFileChange}
        />
        <Typography variant="body2" color="textSecondary">
          {isDragActive
            ? "فایل‌ها را اینجا رها کنید ..."
            : `برای ${text} کلیک کنید یا فایل را بکشید و رها کنید`}
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
            <Box
              key={file.name}
              sx={{
                width: "100%",
                position: "relative",
                display: "inline-block",
              }}
            >
              {type === "image" ? (
                <Image
                  className="rounded-lg w-full h-[100px]"
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              ) : (
                <video
                  className="rounded-lg w-full h-[100px]"
                  src={file.preview}
                  controls
                  style={{ borderRadius: "8px" }}
                />
              )}
              <IconButton
                onClick={handleRemoveFile}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                }}
                size="small"
                aria-label="حذف فایل"
              >
                <MdDelete />
              </IconButton>
            </Box>
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
