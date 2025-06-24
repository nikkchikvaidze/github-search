import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Routes } from "./Routes";
import { FavoritesContextProvider } from "./context/favorites";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavoritesContextProvider>
          <Routes />
        </FavoritesContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
