
import React from "react";
import Module from "./Module";

// export const metadata: Metadata = {
//   title: "آریا کیش | ثبت نام نمایندگی",
//   description: "گارانتی و خدمات پس از فروش آریا کیش",
// };

const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLUB_BASE_URL}/v1/api/guarantee/client/provinces`,

  );
  return res.json();
}

export default async function PreRegisterOrganization() {
  const { result: proviences } = await getData();
  return (
    <div>
      <Module proviences={proviences} />
    </div>
  );
}
