import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { IconButton, Button, LinearProgress, Tooltip } from "@mui/material";

const Uploader = ({
    id,
    location,
    refetch,
    setPhotos,
    text = "آپلود تصویر",
    photos,
    type = "image",
    isFull,
    triggered,
    setTriggered,
}) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const inputRef = useRef(null);
    const statusRef = useRef();
    const loadTotalRef = useRef();

    const onDrop = useCallback(
        async (acceptedFiles) => {
            const validFiles = acceptedFiles.filter((file) => {
                const isValidImage = type === "image" && /^image\/(jpeg|png|gif|webp)$/.test(file.type);
                const isValidVideo = type === "video" && /^video\/(mp4|avi|mov)$/.test(file.type);
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

    const { getInputProps } = useDropzone({
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
        noClick: true,
        noKeyboard: true,
    });

    const openFileDialog = () => {
        inputRef.current?.click();
    };

    const uploadFile = (file) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);

            const xhr = new XMLHttpRequest();
            xhr.open("POST", `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/${location}${id ? `/${id}` : ""}`);

            xhr.upload.addEventListener("progress", (e) => {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    setProgress(percentComplete);
                    if (loadTotalRef.current) {
                        loadTotalRef.current.innerHTML = `${e.loaded} آپلود شده از ${e.total}`;
                    }
                    if (statusRef.current) {
                        statusRef.current.innerHTML = `${Math.round(percentComplete)}% آپلود شد...`;
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
                if (refetch) refetch();
                if (triggered !== undefined && setTriggered) setTriggered(!triggered);

                setPhotos((prev) => [
                    ...prev,
                    {
                        fileName: result.result.fileName,
                        id: +result.result.id,
                    },
                ]);
            } catch (error) {
                toast.error(`آپلود ${file.name} ناموفق بود`);
            }
        }

        setUploading(false);
        setFiles([]);
    };

    useEffect(() => {
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="space-y-4">
            {/* Trigger Button */}
            {isFull ? (
                <Button
                    fullWidth
                    onClick={openFileDialog}
                    className="bg-primary text-white px-6 py-3 rounded-lg"
                >
                    {text}
                </Button>
            ) : (
                <Tooltip title="آپلود فایل" arrow>
                    <span>upload</span>
                </Tooltip>
            )}

            {/* Hidden Input for File Picker */}
            <input
                type="file"
                {...getInputProps()}
                ref={inputRef}
                style={{ display: "none" }}
                multiple
            />

            {/* Preview + Upload Progress */}
            {files.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {files.map((file) => (
                        <div key={file.name} className="w-24">
                            {type === "image" ? (
                                <img src={file.preview} alt={file.name} className="w-full h-auto rounded" />
                            ) : (
                                <video src={file.preview} controls className="w-full h-auto rounded" />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {uploading && (
                <div className="border p-4 border-gray-100 rounded-lg">
                    <LinearProgress className="mt-2" variant="determinate" value={progress} />
                    <p className="text-sm mt-2" ref={statusRef}></p>
                    <p className="text-sm mt-1 text-gray-500" ref={loadTotalRef}></p>
                </div>
            )}
        </div>
    );
};

export default Uploader;
