import { RouterProvider } from "react-router-dom";
import { appRoutes } from "./appRoutes/index";
import { ConfigProvider } from "antd";
import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <RouterProvider router={appRoutes} />
    </ConfigProvider>
  );
}

export default App;
