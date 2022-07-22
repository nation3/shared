import { useErrorContext } from "../ErrorProvider";
import { useEffect } from "react";

type hasError = {
  error: Error | undefined;
};

// For some contract interactions, a reverted call is not an error
export function useHandleError<T extends hasError>(
  object: T,
  throwOnRevert = false
): T {
  const errors = useErrorContext();
  useEffect(() => {
    if (throwOnRevert && object.error) {
      errors.addError([object.error]);
    }
  }, [object.error, throwOnRevert]);
  return object;
}
