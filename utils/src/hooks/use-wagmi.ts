import { useHandleError } from "./use-handle-error";
import { useStaticCall as _useStaticCall } from "./use-static-call";
import {
  useAccount as _useAccount,
  useBalance as _useBalance,
  useConnect as _useConnect,
  useContract as _useContract,
  useContractRead as _useContractRead,
  useContractWrite as _useContractWrite,
  useNetwork as _useNetwork,
  useSignTypedData as _useSignTypedData,
  useSigner as _useSigner,
} from "wagmi";

export function useConnect() {
  return useHandleError(_useConnect());
}

// custom extension of wagmi
export function useStaticCall(params: any) {
  return useHandleError(_useStaticCall(params));
}

export function useAccount(params?: any) {
  return useHandleError(_useAccount(params));
}

export function useNetwork() {
  return useHandleError(_useNetwork());
}

export function useBalance(params: any) {
  return useHandleError(_useBalance(params));
}

export function useSigner(params?: any) {
  return _useSigner(params);
}

export function useContract(params: any) {
  return _useContract(params);
}

export function useContractRead(
  config: any,
  method: any,
  argsAndOverrides: any,
  throwOnRevert?: any,
) {
  return useHandleError(
    _useContractRead(config, method, argsAndOverrides),
    throwOnRevert,
  );
}

export function useContractWrite(
  config: any,
  method: any,
  argsAndOverrides: any,
  throwOnRevert?: any,
) {
  return useHandleError(
    _useContractWrite(config, method, argsAndOverrides),
    throwOnRevert,
  );
}

export function useSignTypedData(params: any) {
  return useHandleError(_useSignTypedData(params));
}
