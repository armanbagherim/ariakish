import React from "react";
import Module from "./Module";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "آریا کیش | ثبت نام نمایندگی",
  description: "گارانتی و خدمات پس از فروش آریا کیش",
};

export default async function PreRegisterOrganization() {
  return (
    <div>
      <Module />
    </div>
  );
}
