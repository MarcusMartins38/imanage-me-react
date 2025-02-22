import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import { AuthRoute } from "./lib/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AboutMe from "./pages/AboutMe";

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route element={<AuthRoute Unauth={true} />}>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                    </Route>

                    <Route element={<AuthRoute />}>
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/about" element={<AboutMe />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
