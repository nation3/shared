import { useErrorContext } from "../ErrorProvider";
import { useEffect } from "react";

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
