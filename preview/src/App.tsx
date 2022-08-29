import "./index.css";
import {
  Nation3App,
  DefaultLayout,
  DefaultSidebar,
  Table,
  InfoAlert,
  Badge,
  Card,
} from "@nation3/components";
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
                route: "/",
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
            onDisconnect={console.log}
          />
        }
      >
        <div className="max-w-2xl">
          <Card>
            <Table
              columns={["A"]}
              data={[
                [
                  <Badge
                    text="Hello Hello Hello Hello"
                    bgColor="yellow-100"
                    textColor="yellow-800"
                  />,
                ],
              ]}
            />
            <InfoAlert message="Error Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello" />
          </Card>
        </div>
      </DefaultLayout>
    </Nation3App>
  );
}

export default App;
