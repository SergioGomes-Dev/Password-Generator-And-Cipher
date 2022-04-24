import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import PasswordGeneratorScreen from "./screens/PasswordGeneratorScreen";
import CipherProgramScreen from "./screens/CipherProgramScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<HomeScreen />} />
        <Route path="/password" element={<PasswordGeneratorScreen />} />
        <Route path="/cipher" element={<CipherProgramScreen />} />
        <Route path="/privacy" element={<PrivacyPolicyScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
