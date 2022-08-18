import { KeyIcon, XCircleIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { ErrorAlert } from "../Alerts";
import { TransparentButton } from "../Buttons";
import { Connector } from "../Types";
import Modal from "./Modal";

export default function SignInModal({
  onClose,
  onConnect,
  connectors,
}: {
  onClose: () => void;
  onConnect: (connector: Connector) => void;
  connectors: Connector[];
}) {
  const [connectError, setConnectError] = useState<Error | null>(null);

  const connect = (connector: Connector) => {
    try {
      onConnect(connector);
    } catch (e) {
      setConnectError(e as Error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <>
        <h3 className="px-4 text-lg font-bold">
          Sign in by connecting your account
        </h3>

        <p className="p-4">You can choose from these providers:</p>
        {connectError ? (
          <div className="mb-4 alert alert-error">
            <ErrorAlert errorMessage={connectError.message} />
          </div>
        ) : (
          ""
        )}

        <ul className="p-2 -m-2 menu bg-base-100 rounded-box">
          {connectors.map((connector) => (
            <li key={connector.id}>
              <TransparentButton
                disabled={!connector.ready}
                onClick={() => connect(connector)}
              >
                <div className="px-3">
                  {connector.icon || <KeyIcon className="w-5 h-5" />}
                </div>
                {connector.name}
                {!connector.ready ? " (unsupported)" : ""}
              </TransparentButton>
            </li>
          ))}
        </ul>

        <p className="px-4 mt-4">
          New to Ethereum?{" "}
          <a
            href="https://ethereum.org/wallets/"
            rel="noreferrer noopener"
            target="_blank"
            className="underline text-n3blue"
          >
            Learn more about wallets
          </a>
          .<br />
          <br />
          By using this software, you agree to{" "}
          <a
            href="https://github.com/nation3/app/blob/master/LICENSE.md"
            rel="noreferrer noopener"
            target="_blank"
            className="underline text-n3blue"
          >
            its terms of use
          </a>
          .
        </p>
      </>
    </Modal>
  );
}
