"use client";
import React from "react";
import AdditionalData from "./AdditionalData";
import Map from "./Map";

function NewAddress({ formik }) {
  return (
    <>
      <Map isAdmin data={formik} />
      <AdditionalData data={formik} />
    </>
  );
}

export default React.memo(NewAddress);
