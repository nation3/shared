import { useEffect } from "react";
import { useErrorContext } from "./ErrorProvider";

// For some contract interactions, a reverted call is not an error
export function useHandleError(object: any, throwOnRevert = true) {
  const errors = useErrorContext();
  useEffect(() => {
    if (throwOnRevert && object.error) {
      errors.addError([object.error]);
    }
  }, [object.error, throwOnRevert]);
  return object;
}
