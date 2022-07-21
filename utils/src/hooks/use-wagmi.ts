import { useHandleError } from "./use-handle-error";
import { useStaticCall as _useStaticCall } from "./use-static-call";
import { useEffect } from "react";
import {
  useAccount as _useAccount,
  useBalance as _useBalance,
  useConnect as _useConnect,
  useEnsResolveName as _useEnsResolveName,
  useContract as _useContract,
  useContractRead as _useContractRead,
  useContractWrite as _useContractWrite,
  useNetwork as _useNetwork,
  useSignTypedData as _useSignTypedData,
  useSigner as _useSigner,
  useWaitForTransaction as _useWaitForTransaction,
  useSignMessage as _useSignMessage,
  useEnsResolveName,
  Connector,
} from "wagmi";

export function useConnect() {
  const [obj, connect] = _useConnect();
  return {
    ...obj,
    connect: async (connector: Connector) => await connect(connector),
  };
}

export function useWaitForTransaction<T>(params: T) {
  return useHandleError(_useWaitForTransaction(params)[0]);
}

export function useEnsName<T>(params: T) {
  return useHandleError(useEnsResolveName(params)[0]);
}

// custom extension of wagmi
export function useStaticCall(params: any) {
  return useHandleError(_useStaticCall(params));
}

export function useAccount(params?: any) {
  return useHandleError(_useAccount(params)[0]);
}

export function useNetwork() {
  return useHandleError(_useNetwork()[0]);
}

export function useBalance(params: any) {
  return useHandleError(_useBalance(params)[0]);
}

export function useSigner(params?: any) {
  return _useSigner(params)[0];
}

export function useContract(params: any) {
  return _useContract(params);
}

export function useContractRead(
  config: any,
  method: any,
  argsAndOverrides: any,
  throwOnRevert?: any
) {
  return useHandleError(
    _useContractRead(config, method, argsAndOverrides)[0],
    throwOnRevert
  );
}

export function useContractWrite(
  config: any,
  method: any,
  argsAndOverrides: any,
  throwOnRevert?: boolean
) {
  const [res, call] = _useContractWrite(config, method, argsAndOverrides);
  return useHandleError(
    {
      ...res,
      writeAsync: async (args: any) => await call(args),
    },
    throwOnRevert
  );
}

export function useSignTypedData<T>(params: T, throwOnRevert?: boolean) {
  const [res, call] = _useSignTypedData(params);
  return useHandleError(
    {
      ...res,
      writeAsync: async () => await call(params),
    },
    throwOnRevert
  );
}

export function useSignMessage(
  params: {
    message: string;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
  },
  throwOnRevert?: boolean
) {
  const [res, call] = _useSignMessage(params);

  useEffect(() => {
    if (res.data) {
      params.onSuccess && params.onSuccess(res.data);
    }
  }, [res.data]);

  useEffect(() => {
    if (res.error) {
      params.onError && params.onError(res.error);
    }
  }, [res.error]);

  return useHandleError(
    {
      ...res,
      signMessage: async () => await call({ message: params.message }),
    },
    throwOnRevert
  );
}
