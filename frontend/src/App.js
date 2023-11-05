import { AllRoutes } from "./routes/AllRoutes";
import { Navbar } from "./components/common/Navbar";
import { AddRecipeModal } from "./pages/AddRecipeModal";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <AllRoutes></AllRoutes>
      <AddRecipeModal />
      <Footer />
    </div>
  );
}

export default App;
