import { AllRoutes } from "./routes/AllRoutes";
import { Navbar} from './components/common/Navbar';
import FeedCard from "./components/Feed/FeedCard";
import {MiniCard_Chef,MiniCard_Recipes} from "./components/Feed/MiniCard";


function App() {
  return (
    <div >
      <Navbar></Navbar>
      
      <AllRoutes></AllRoutes>
    </div>
  );
}

export default App;
