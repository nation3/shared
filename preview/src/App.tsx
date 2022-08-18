import "./index.css";
import { Nation3App, DefaultLayout, DefaultSidebar } from "@nation3/components";
import { ViewGridIcon } from "@heroicons/react/outline";
import logo from "./logo.svg";

function App() {
  return (
    <Nation3App>
      <DefaultLayout
        sidebar={
          <DefaultSidebar
            onConnect={console.log}
            logo={<img src={logo} alt="logo" />}
            onRoute={console.log}
            navLinks={[
              {
                href: "/",
                icon: <ViewGridIcon className="w-5 h-5" />,
                name: "Start",
              },
            ]}
            connectors={[
              {
                name: "MetaMask",
                id: "ADUBO",
                ready: true,
              },
            ]}
            account={{
              address: "0x540ABe72",
              connector: {
                name: "MetaMask",
                id: "ADUBO",
                ready: true,
              },
            }}
          />
        }
      />
    </Nation3App>
  );
}

export default App;
