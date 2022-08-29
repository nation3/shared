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
          <Card className="flex flex-col gap-8">
            <Table
              columns={["participant", "STAKE", "STATUS"]}
              data={[
                [
                  "test.eth",
                  <b>10 $NATION</b>,
                  <Badge
                    text="Signed finalization"
                    bgColor="green-100"
                    textColor="green-800"
                  />,
                ],
                [
                  "greg.eth",
                  <b>4 $NATION</b>,
                  <Badge
                    text="Hasn't joined"
                    bgColor="yellow-100"
                    textColor="yellow-800"
                  />,
                ],
                [
                  "0xgallego.eth",
                  <b>4 $NATION</b>,
                  <Badge
                    text="Hasn't joined"
                    bgColor="yellow-100"
                    textColor="yellow-800"
                  />,
                ],
              ]}
            />
            <InfoAlert message="If you are one of the parties involved in this agreement, please keep the terms file safe. You will need it to interact with this app." />
          </Card>
        </div>
      </DefaultLayout>
    </Nation3App>
  );
}

export default App;
