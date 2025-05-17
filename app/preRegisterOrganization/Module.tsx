"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { DatePicker } from "@mui/x-date-pickers";
import NewAddress from "../_components/design/NewAddress";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import Uploader from "../_components/design/uploader";
import { toast } from "react-toastify";
import { validationSchema } from "./schema";
import createCache from "@emotion/cache";

// Memoize the theme and cache to prevent recreation
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  typography: { fontFamily: "IRANSansX" },
});

function Module() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      licenseDate: new Date(),
      licenseCode: "",
      licenseAttachmentId: null,
      nationalAttachmentId: null,
      estateAttachmentId: null,
      postalAttachmentId: null,
      address: {
        name: "",
        latitude: "35.65326",
        longitude: "51.35471",
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
        phoneNumber: "",
        firstname: "",
        lastname: "",
      },
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // Validate form manually to ensure all fields are touched
      const errors = await formik.validateForm(values);
      formik.setTouched({
        title: true,
        licenseDate: true,
        licenseCode: true,
        licenseAttachmentId: true,
        nationalAttachmentId: true,
        estateAttachmentId: true,
        postalAttachmentId: true,
        user: {
          phoneNumber: true,
          firstname: true,
          lastname: true,
        },
        address: {
          name: true,
          latitude: true,
          longitude: true,
          provinceId: true,
          cityId: true,
          neighborhoodId: true,
          street: true,
          alley: true,
          plaque: true,
          floorNumber: true,
          postalCode: true,
        },
      });

      // Check for missing file uploads
      const missingFiles = [];
      if (!values.licenseAttachmentId) {
        missingFiles.push("تصویر پروانه کسب");
      }
      if (!values.nationalAttachmentId) {
        missingFiles.push("تصویر کارت ملی");
      }
      if (!values.estateAttachmentId) {
        missingFiles.push("تصویر نمای بیرون واحد صنفی");
      }
      if (!values.postalAttachmentId) {
        missingFiles.push("تصویر داخل واحد صنفی");
      }

      // Show toast errors for missing files
      if (missingFiles.length > 0) {
        missingFiles.forEach((file) => {
          toast.error(`${file} الزامی است`);
        });
      }

      // Show toast errors for other validation errors
      const errorMessages = [];
      if (errors.title) errorMessages.push(errors.title);
      if (errors.licenseDate) errorMessages.push(errors.licenseDate);
      if (errors.licenseCode) errorMessages.push(errors.licenseCode);
      if (errors.user?.firstname) errorMessages.push(errors.user.firstname);
      if (errors.user?.lastname) errorMessages.push(errors.user.lastname);

      if (errors.address) {
        Object.values(errors.address).forEach((msg) => {
          if (typeof msg === "string") errorMessages.push(msg);
        });
      }

      if (errorMessages.length > 0) {
        errorMessages.forEach((msg) => toast.error(msg));
      }

      // Stop submission if there are errors or missing files
      if (Object.keys(errors).length > 0 || missingFiles.length > 0) {
        setSubmitting(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/anonymous/preRegistrationOrganizations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTrackingId(data.result?.id || "نامشخص");
          setIsSubmitted(true);
          toast.success("اطلاعات با موفقیت ارسال شد");
          formik.resetForm();
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "ارسال اطلاعات با مشکل مواجه شد");
        }
      } catch (error) {
        console.error("Submission Error:", error);
        toast.error("خطا در ارسال اطلاعات");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Memoize the onChange handler for DatePicker to prevent re-renders
  const handleDateChange = React.useCallback(
    (value) => {
      formik.setFieldValue("licenseDate", value);
    },
    [formik]
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <div dir="rtl" className="p-6 mx-auto container">
            {isSubmitted ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  px: 4,
                  backgroundColor: "#f0f4f8",
                  borderRadius: "8px",
                  boxShadow: 1,
                }}
              >
                <Typography variant="h4" gutterBottom>
                  تشکر از شما
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  درخواست شما با شماره پیگیری {trackingId} ثبت شد و پس از تایید
                  با شما تماس خواهیم گرفت.
                </Typography>
              </Box>
            ) : (
              <form onSubmit={formik.handleSubmit} className="space-y-8">
                <section>
                  <h2 className="text-xl font-bold mb-4">اطلاعات تماس</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <TextField
                        fullWidth
                        label="نام"
                        name="user.firstname"
                        value={formik.values.user.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.user?.firstname &&
                          Boolean(formik.errors.user?.firstname)
                        }
                        helperText={
                          formik.touched.user?.firstname &&
                          formik.errors.user?.firstname
                        }
                      />
                    </div>
                    <div>
                      <TextField
                        fullWidth
                        label="نام خانوادگی"
                        name="user.lastname"
                        value={formik.values.user.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.user?.lastname &&
                          Boolean(formik.errors.user?.lastname)
                        }
                        helperText={
                          formik.touched.user?.lastname &&
                          formik.errors.user?.lastname
                        }
                      />
                    </div>
                    <div>
                      <TextField
                        fullWidth
                        label="شماره تماس"
                        name="user.phoneNumber"
                        value={formik.values.user.phoneNumber}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "user.phoneNumber",
                            e.target.value
                          );
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.user?.phoneNumber &&
                          Boolean(formik.errors.user?.phoneNumber)
                        }
                        helperText={
                          formik.touched.user?.phoneNumber &&
                          formik.errors.user?.phoneNumber
                        }
                      />
                    </div>
                  </div>
                </section>
                <section>
                  <h2 className="text-xl font-bold mb-4">اطلاعات کلی</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <TextField
                        fullWidth
                        label="نام واحد صنفی"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                      />
                    </div>
                    <div>
                      <DatePicker
                        label="تاریخ جواز کسب"
                        value={formik.values.licenseDate}
                        onChange={handleDateChange}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error:
                              formik.touched.licenseDate &&
                              Boolean(formik.errors.licenseDate),
                            helperText:
                              formik.touched.licenseDate &&
                              formik.errors.licenseDate,
                          },
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        fullWidth
                        label="شناسه جواز کسب"
                        name="licenseCode"
                        value={formik.values.licenseCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.licenseCode &&
                          Boolean(formik.errors.licenseCode)
                        }
                        helperText={
                          formik.touched.licenseCode &&
                          formik.errors.licenseCode
                        }
                      />
                    </div>
                  </div>
                </section>
                <section>
                  <h2 className="text-xl font-bold mb-4">آپلود تصاویر</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Typography variant="subtitle1" gutterBottom>
                        تصویر پروانه کسب
                      </Typography>
                      <Uploader
                        location="v1/api/guarantee/anonymous/attachments/image"
                        formik={formik}
                        formikFieldName="licenseAttachmentId"
                      />
                    </div>
                    <div>
                      <Typography variant="subtitle1" gutterBottom>
                        تصویر کارت ملی
                      </Typography>
                      <Uploader
                        location="v1/api/guarantee/anonymous/attachments/image"
                        formik={formik}
                        formikFieldName="nationalAttachmentId"
                      />
                    </div>
                    <div>
                      <Typography variant="subtitle1" gutterBottom>
                        تصویر نمای بیرون واحد صنفی
                      </Typography>
                      <Uploader
                        location="v1/api/guarantee/anonymous/attachments/image"
                        formik={formik}
                        formikFieldName="estateAttachmentId"
                      />
                    </div>
                    <div>
                      <Typography variant="subtitle1" gutterBottom>
                        تصویر داخل واحد صنفی
                      </Typography>
                      <Uploader
                        location="v1/api/guarantee/anonymous/attachments/image"
                        formik={formik}
                        formikFieldName="postalAttachmentId"
                      />
                    </div>
                  </div>
                </section>
                <section>
                  <h2 className="text-xl font-bold mb-4">اطلاعات آدرس</h2>
                  <NewAddress formik={formik} />
                </section>
                <section className="text-left mt-6">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={formik.isSubmitting}
                  >
                    ثبت
                  </Button>
                </section>
              </form>
            )}
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default React.memo(Module);
