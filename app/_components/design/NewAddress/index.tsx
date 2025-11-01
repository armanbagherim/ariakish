"use client";
import React from "react";
import AdditionalData from "./AdditionalData";
import Map from "./Map";

interface NewAddressProps {
  formik: any;
  fetchAddress: () => Promise<void>;
  shouldShowAddress: boolean;
  tempCity: any;
  proviences: Array<{id: number, name: string, slug: string}>;
  cities: Array<{id: number, name: string}>;
  loadingCities: boolean;
  onProvinceChange: (value: any) => void;
}

function NewAddress({ 
  formik, 
  fetchAddress, 
  shouldShowAddress, 
  tempCity, 
  proviences,
  cities,
  loadingCities,
  onProvinceChange
}: NewAddressProps) {

  return (
    <>
      <Map isAdmin data={formik} fetchAddress={fetchAddress} />
      {shouldShowAddress && (
        <AdditionalData 
          proviences={proviences} 
          tempCity={tempCity} 
          data={formik} 
          cities={cities}
          loadingCities={loadingCities}
          onProvinceChange={onProvinceChange}
        />
      )}
    </>
  );
}

export default React.memo(NewAddress);
