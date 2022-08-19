import React from "react";
import { Button, ExternalNavButton, NavButton } from "../Buttons";
import AccountButton from "../Buttons/AccountButton";
import SignInButton from "../Buttons/SignInButton";
import { Account, Connector } from "../Types";

type LinkProps = {
  href: string;
  icon: React.ReactElement;
  name: string;
};

export default function Sidebar({
  logo,
  navLinks,
  onRoute,
  onConnect,
  onDisconnect,
  connectors,
  account,
}: {
  logo: React.ReactElement;
  navLinks: LinkProps[];
  onRoute: (href: string) => void;
  onConnect: (connector: Connector) => void;
  onDisconnect?: () => void;
  connectors: Connector[];
  account?: Account;
}) {
  return (
    <aside
      className="flex flex-col justify-between min-h-screen overflow-y-auto bg-white w-80 lg:pb-0 drop-shadow-md"
      aria-label="Sidebar"
    >
      <div>
        <div className="py-4 mt-6 lg:block">
          <div className="px-8 pt-2 cursor-pointer">
            <div onClick={() => onRoute("/")}>{logo}</div>
          </div>
        </div>
        <ul className="p-4 overflow-y-auto grow">
          {navLinks.map((link, idx) =>
            link.href.charAt(0) === "/" ? (
              <NavButton
                key={idx}
                route={link.href}
                name={link.name}
                icon={link.icon}
                onRoute={onRoute}
              />
            ) : (
              <ExternalNavButton
                key={idx}
                url={link.href}
                name={link.name}
                icon={link.icon}
              />
            )
          )}
        </ul>
      </div>
      <div className="w-full p-4">
        {account ? (
          <AccountButton account={account} onDisconnect={onDisconnect} />
        ) : (
          <SignInButton connectors={connectors} onConnect={onConnect} />
        )}
      </div>
    </aside>
  );
}
