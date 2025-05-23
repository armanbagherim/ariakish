"use client";
import { TextField } from "@mui/material";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { fetcher } from "../fetcher";
import SearchSelect from "../SearchSelect";

function AdditionalData({ data, tempCity, proviences }) {
  console.log('the changed data', data.values)

  // Memoize handleSelectChange to prevent recreation
  const handleSelectChange = useCallback(
    (field, value) => {
      data.setFieldValue(`address.${field}`, value?.id || null);
    },
    [data]
  );

  // Memoize formFields to prevent recreation
  const formFields = useMemo(
    () => [
      { name: "name", label: "نام آدرس" },
      { name: "street", label: "خیابان" },
      { name: "alley", label: "کوچه" },
      { name: "plaque", label: "پلاک" },
      { name: "floorNumber", label: "طبقه" },
      { name: "postalCode", label: "کد پستی" },
    ],
    []
  );

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 request">
      {/* Province Select */}
      {proviences && (
        <SearchSelect
          disabled={true}
          onChange={(e) => handleSelectChange("provinceId", e)}
          data={proviences}
          defaultValue={data.values.address.provinceId}
          value={data.values.address.provinceId}
          label="استان"
        />
      )}

      {/* City Select */}
      {/* Add your city select logic here if needed */}

      {/* Address Fields */}
      {formFields.map((field) => {
        const fieldName = `address.${field.name}`;
        return (
          <TextField
            key={field.name}
            id={fieldName}
            name={fieldName}
            label={field.label}
            variant="outlined"
            fullWidth
            value={data.values.address?.[field.name] || ""}
            onChange={data.handleChange}
            onBlur={data.handleBlur}
            error={Boolean(
              data.errors.address?.[field.name] &&
              data.touched.address?.[field.name]
            )}
            helperText={
              data.touched.address?.[field.name] &&
              data.errors.address?.[field.name]
            }
          />
        );
      })}
    </div>
  );
}

export default React.memo(AdditionalData);