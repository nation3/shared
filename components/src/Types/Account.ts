import Connector from "./Connector";

type Account = {
  ensName?: string;
  address: string;
  connector: Connector;
};

export default Account;
