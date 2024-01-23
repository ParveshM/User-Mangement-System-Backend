import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/Store";
const App = () => {
  return (
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
