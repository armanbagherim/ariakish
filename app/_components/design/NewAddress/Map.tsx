"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useCallback, useMemo } from "react";

// ✅ Move dynamic outside the component
const MapClient = dynamic(() => import("./MapClient"), { ssr: false });

export default function Map({ data, isAdmin = false }) {
  useEffect(() => {
    console.log("updated values in UseEffect", data.values);
  }, [data]);

  const handleLocationChange = useCallback(
    (location) => {
      console.log("Before update", data.values);

      if (isAdmin) {
        data.setFieldValue("address.latitude", location.lat.toString());
        data.setFieldValue("address.longitude", location.lng.toString());
      } else {
        data.setFieldValue("latitude", location.lat.toString());
        data.setFieldValue("longitude", location.lng.toString());
      }

      console.log("After update", data.values);
    },
    [data, isAdmin]
  );

  // ✅ Memoize default location
  const defaultLocation = useMemo(() => {
    const lat = isAdmin
      ? data.values.address?.latitude ?? "35.65326"
      : data.values.latitude ?? "35.65326";

    const lng = isAdmin
      ? data.values.address?.longitude ?? "51.35471"
      : data.values.longitude ?? "51.35471";

    return {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
  }, [
    isAdmin,
    data.values.address?.latitude,
    data.values.address?.longitude,
    data.values.latitude,
    data.values.longitude,
  ]);

  return (
    <div className="w-full relative block mb-12 bg-gray-100">
      <MapClient
        height={400}
        defaultLocation={defaultLocation}
        onLocationChange={handleLocationChange}
      />
    </div>
  );
}
