"use client";
import React from "react";
import AdditionalData from "./AdditionalData";
import Map from "./Map";

function NewAddress({ formik, fetchAddress, shouldShowAddress, tempCity, proviences }) {

  return (
    <>
      add button to set map
      <Map isAdmin data={formik} fetchAddress={fetchAddress} />


      {shouldShowAddress && <AdditionalData proviences={proviences} tempCity={tempCity} data={formik} />}

    </>
  );
}

export default React.memo(NewAddress);
