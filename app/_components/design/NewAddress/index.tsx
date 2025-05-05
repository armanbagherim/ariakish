"use client";
import React from "react";
import AdditionalData from "./AdditionalData";

function NewAddress({ formik }) {
  // Debug re-renders
  React.useEffect(() => {
    console.log("NewAddress component rendered");
  });

  return (
    <>
      {/* <Map data={formik} /> */}
      <AdditionalData data={formik} />
    </>
  );
}

export default React.memo(NewAddress);
