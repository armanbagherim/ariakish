"use client";
import React from "react";
import GravityFormForm from "next-gravity-forms";

const Modules = ({ data }) => {
  return (
    <div className="container mx-auto mt-12 px-6">
      <GravityFormForm data={data} />
    </div>
  );
};

export default Modules;
