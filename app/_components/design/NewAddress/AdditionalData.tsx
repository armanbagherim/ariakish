"use client";
import { TextField } from "@mui/material";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { fetcher } from "../fetcher";
import SearchSelect from "../SearchSelect";

function AdditionalData({ data }) {
  const [provinces, setProvinces] = useState(null);
  const [cities, setCities] = useState(null);
  const [neighborhoods, setNeighborhoods] = useState(null);

  // Fetch provinces once
  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await fetcher({
        url: `/v1/api/guarantee/client/provinces`,
        method: "GET",
      });
      setProvinces(res.result);
    };
    fetchProvinces();
  }, []);

  // Fetch cities when provinceId changes
  useEffect(() => {
    const provinceId = data.values.address?.provinceId;
    if (provinceId) {
      const fetchCities = async () => {
        const res = await fetcher({
          url: `/v1/api/guarantee/client/cities?provinceId=${provinceId}`,
          method: "GET",
        });
        setCities(res.result);
      };
      fetchCities();
    } else {
      setCities(null);
    }
  }, [data.values.address?.provinceId]);

  // Fetch neighborhoods when cityId changes
  useEffect(() => {
    const cityId = data.values.address?.cityId;
    if (cityId) {
      const fetchNeighborhoods = async () => {
        const res = await fetcher({
          url: `/v1/api/guarantee/client/neighborhoods?cityId=${cityId}`,
          method: "GET",
        });
        setNeighborhoods(res.result);
      };
      fetchNeighborhoods();
    } else {
      setNeighborhoods(null);
    }
  }, [data.values.address?.cityId]);

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
      {provinces && (
        <SearchSelect
          nullable
          onChange={(e) => handleSelectChange("provinceId", e)}
          data={provinces}
          value={data.values.address?.provinceId}
          defaultValue={data.values.address?.provinceId}
          label="استان"
        />
      )}

      {/* City Select */}
      {cities && (
        <SearchSelect
          nullable
          onChange={(e) => handleSelectChange("cityId", e)}
          data={cities}
          value={data.values.address?.cityId}
          defaultValue={data.values.address?.cityId}
          label="شهر"
        />
      )}

      {/* Neighborhood Select */}
      {neighborhoods && neighborhoods.length > 0 && (
        <SearchSelect
          nullable
          onChange={(e) => handleSelectChange("neighborhoodId", e)}
          data={neighborhoods}
          value={data.values.address?.neighborhoodId}
          defaultValue={data.values.address?.neighborhoodId}
          label="محله"
        />
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

export default React.memo(AdditionalData);
