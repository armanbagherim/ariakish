import { getGravityForm } from "next-gravity-forms/server";

import React from "react";
import Modules from "./Modules";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "گارانتی آریا کیش | فرم شکایات",
  description: "فرم شکایات آریا کیش",
};

const Page = async () => {
  const data = await getGravityForm(7);

  return <Modules data={data} />;
};

export default Page;
