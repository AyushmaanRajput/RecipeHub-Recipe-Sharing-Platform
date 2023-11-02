import { AllRoutes } from "./routes/AllRoutes";
import { Navbar } from "./components/common/Navbar";
import { AddRecipeModal } from "./pages/AddRecipeModal";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <AllRoutes></AllRoutes>
      <AddRecipeModal />
    </div>
  );
}

export default App;
