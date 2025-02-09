import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Tasks from "./pages/Tasks";
import { Provider } from "react-redux";
import { store } from "./store";
import Settings from "./pages/Settings";
import { AuthRoute, UnauthRoute } from "./lib/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route element={<UnauthRoute />}>
              <Route path="/" element={<SignIn />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>

            <Route element={<AuthRoute />}>
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
