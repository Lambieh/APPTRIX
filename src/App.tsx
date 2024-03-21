import { PersistGate } from "redux-persist/integration/react";
import { AppRouterProvider } from "./router";
import { persistor, store } from "./Store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouterProvider />
      </PersistGate>
    </Provider>
  );
};

export default App;
