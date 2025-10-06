"use client";

import { AxiosError, AxiosInstance } from "axios";
import { createContext, FC, ReactNode, useContext, useMemo } from "react";

import { createAxios } from "@/lib/axios";

interface IAxiosContext {
  axios: AxiosInstance;
}

const AxiosContext = createContext<IAxiosContext>({ axios: createAxios() });

export const AxiosProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const axInstance = useMemo(() => {
    const instance = createAxios();
    instance.interceptors.request.use(
      config => config,
      error => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    return { axios: instance };
  }, []);

  return (
    <AxiosContext.Provider value={axInstance}>{children}</AxiosContext.Provider>
  );
};

export const useAxios = (): IAxiosContext => {
  return useContext(AxiosContext);
};
