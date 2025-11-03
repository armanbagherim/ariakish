"use client";
import { TextField, CircularProgress, FormHelperText } from "@mui/material";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import SearchSelect from "../SearchSelect";

interface AdditionalDataProps {
  data: {
    values: {
      address: {
        [key: string]: any;
      };
    };
    setFieldValue: (field: string, value: any) => void;
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    errors: {
      address?: {
        [key: string]: string;
      };
    };
    touched: {
      address?: {
        [key: string]: boolean;
      };
    };
  };
  tempCity: any;
  proviences: Array<{ id: number; name: string; slug: string }>;
  cities?: Array<{ id: number; name: string; provinceId: number }>;
  loadingCities?: boolean;
}

function AdditionalData({ data, tempCity, proviences, cities = [], loadingCities = false }: AdditionalDataProps) {
  console.log('the changed data', data.values)

  // Memoize handleSelectChange to prevent recreation
  const handleSelectChange = useCallback(
    (field: string, value: any) => {
      data.setFieldValue(`address.${field}`, value?.id || null);
      // Reset city when province changes
      if (field === 'provinceId') {
        data.setFieldValue('address.cityId', null);
      }
    },
    [data]
  );

  // Memoize formFields to prevent recreation
  const formFields = useMemo(
    () => [
      { name: "name", label: "نام آدرس برای مثال خانه یا شرکت" },
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
      <SearchSelect
        disabled={!data.values.address.provinceId || loadingCities}
        onChange={(e: any) => handleSelectChange("cityId", e)}
        data={cities}
        defaultValue={data.values.address.cityId}
        value={data.values.address.cityId}
        label={loadingCities ? 'در حال دریافت شهرها...' : 'شهر'}
      />
      {data.touched.address?.cityId && data.errors.address?.cityId && (
        <FormHelperText error>{data.errors.address.cityId}</FormHelperText>
      )}

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

// Add display name for debugging
AdditionalData.displayName = 'AdditionalData';

export default React.memo(AdditionalData);