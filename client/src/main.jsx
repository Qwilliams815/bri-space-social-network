import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { api } from "./state/api";
// Redux persist allows for local state storage
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

// const store = configureStore({
// 	reducer: {
// 		reducer: persistedReducer,
// 		middleware: (getDefaultMiddleware) =>
// 			getDefaultMiddleware({
// 				serializableCheck: {
// 					// Bypass some warnings that come up when using redux-persist
// 					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// 				},
// 			}).concat(api.middleware),
//     },
// 	}),
// });

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// setupListeners(store.dispatch);
// export const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistStore(store)}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
