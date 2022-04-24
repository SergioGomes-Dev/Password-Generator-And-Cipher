import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import PasswordGeneratorScreen from "./screens/PasswordGeneratorScreen";
import CipherProgramScreen from "./screens/CipherProgramScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<HomeScreen />} />
        <Route path="/password" element={<PasswordGeneratorScreen />} />
        <Route path="/cipher" element={<CipherProgramScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
