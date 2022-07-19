import { config } from "./config";
import React from "react";
import { createContext, useContext, useState } from "react";
import { useNetwork } from "wagmi";

const ErrorContext = createContext({} as any);

function ErrorProvider({ children }: React.PropsWithChildren<{}>) {
  const [errors, setErrors] = useState([] as any);
  let [count, setCount] = useState(0);
  const [{ data }] = useNetwork();

  const addError = (newErrors: any) => {
    if (
      newErrors &&
      newErrors[0] &&
      data.chain?.id &&
      data.chain.id ==
        config.networks[process.env.NEXT_PUBLIC_CHAIN ?? "mainnet"]
    ) {
      for (let error of newErrors) {
        console.error(error);
        if (error instanceof Error) {
          error = JSON.parse(
            JSON.stringify(error, Object.getOwnPropertyNames(error)),
          );
          // Don't add the error if it's "invalid address or ENS name",
          // no idea why those errors appear in the first place.
          if (
            error.code &&
            (error.code === "INVALID_ARGUMENT" ||
              error.code === "MISSING_ARGUMENT")
          ) {
            return;
          }
        }
        setErrors([{ key: count, ...error }, ...errors]);
        setCount(++count);
      }
    }
  };

  const removeError = (key: any) => {
    if (key > -1) {
      setErrors(errors.filter((error: any) => error.key !== key));
      setCount(--count);
    }
  };

  const context = { errors, addError, removeError };
  return (
    <ErrorContext.Provider value={context}>{children}</ErrorContext.Provider>
  );
}

function useErrorContext() {
  const errors = useContext(ErrorContext);
  if (errors === undefined) {
    throw new Error("useErrorContext must be used within a ErrorProvider");
  }
  return errors;
}

export { ErrorProvider, useErrorContext };
