'use client'
import React from "react";
import { useFormik } from "formik";
import {
    Box,
    Button,
    TextField,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { DatePicker } from "@mui/x-date-pickers";
import NewAddress from "../_components/design/NewAddress";
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import Uploader from "../_components/design/uploader";

export default function Module() {
    const [photos, setPhotos] = React.useState([]);
    console.log(photos)
    const formik = useFormik({
        initialValues: {
            title: "",
            licenseDate: new Date(),
            licenseAttachmentId: 0,
            nationalAttachmentId: 0,
            estateAttachmentId: 0,
            postalAttachmentId: 0,
            address: {
                name: "",
                latitude: "",
                longitude: "",
                provinceId: 0,
                cityId: 0,
                neighborhoodId: 0,
                street: "",
                alley: "",
                plaque: "",
                floorNumber: "",
                postalCode: "",
            },
            user: {
                phoneNumber: {},
                firstname: "",
                lastname: "",
            },
        },
        onSubmit: async (values) => {
            console.log("Form submitted with values:", values);
        },
    });

    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={createTheme({ direction: "rtl", typography: { fontFamily: "IRANSansX" } })}>
                <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                    <div dir="rtl" className="p-6 mx-auto container">
                        <form onSubmit={formik.handleSubmit} className="space-y-8">
                            <h2 className="text-xl font-bold mb-4">اطلاعات کلی</h2>

                            {/* Title */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <TextField
                                    fullWidth
                                    label="عنوان"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />

                                <DatePicker
                                    label="تاریخ مجوز"
                                    value={formik.values.licenseDate}
                                    onChange={(value) => formik.setFieldValue("licenseDate", value)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: formik.touched.licenseDate && Boolean(formik.errors.licenseDate),
                                            helperText: formik.touched.licenseDate && formik.errors.licenseDate,
                                            onBlur: formik.handleBlur,
                                            name: "licenseDate",
                                        },
                                        desktopPaper: { dir: "rtl" },
                                        mobilePaper: { dir: "rtl" },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="کد پیوست مجوز"
                                    name="licenseAttachmentId"
                                    type="number"
                                    value={formik.values.licenseAttachmentId}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <Uploader isFull location="v1/api/guarantee/anonymous/attachments/image" photos={photos} setPhotos={setPhotos} />
                            {/* Attachments */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                <TextField
                                    fullWidth
                                    label="کد پیوست ملی"
                                    name="nationalAttachmentId"
                                    type="number"
                                    value={formik.values.nationalAttachmentId}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    fullWidth
                                    label="کد پیوست ملک"
                                    name="estateAttachmentId"
                                    type="number"
                                    value={formik.values.estateAttachmentId}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    fullWidth
                                    label="کد پیوست پستی"
                                    name="postalAttachmentId"
                                    type="number"
                                    value={formik.values.postalAttachmentId}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* User Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <TextField
                                    fullWidth
                                    label="نام"
                                    name="user.firstname"
                                    value={formik.values.user.firstname}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    fullWidth
                                    label="نام خانوادگی"
                                    name="user.lastname"
                                    value={formik.values.user.lastname}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <h2 className="text-xl font-bold mb-4">اطلاعات آدرس</h2>
                                <NewAddress formik={formik} />
                            </div>

                            {/* Submit */}
                            <div className="text-left mt-6">
                                <Button type="submit" variant="contained" color="primary">
                                    ثبت
                                </Button>
                            </div>
                        </form>
                    </div>
                </LocalizationProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}
