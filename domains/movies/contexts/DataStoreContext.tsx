"use client";

import React, { createContext, useContext } from "react";
import { DataStore } from "@/domains/movies/services/DataStore";
import { LocalStorageDataStore } from "@/domains/movies/services/LocalStorageDataStore";

const DataStoreContext = createContext<DataStore | null>(null);

export const useDataStore = () => {
  const context = useContext(DataStoreContext);
  if (!context) {
    throw new Error("useDataStore must be used within a DataStoreProvider");
  }
  return context;
};

export const DataStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dataStore = new LocalStorageDataStore();

  return <DataStoreContext.Provider value={dataStore}>{children}</DataStoreContext.Provider>;
};
