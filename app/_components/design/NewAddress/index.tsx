"use client";
import React, { useEffect, useState } from "react";
import Map from "./Map";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import AdditionalData from "./AdditionalData";
import { formSchema } from "./schema";

export default function NewAddress({ formik }) {
  return (
    <>
      {/* <Map data={formik} /> */}
      <AdditionalData data={formik} />
    </>

  );
}
