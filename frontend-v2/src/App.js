import HomePage from "./HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        {/* authentication routes  */}

        {/* choose the user  */}
        {/* employer  */}

        {/* employee  */}

        {/* shared  */}

      </Routes>
    </Router>
  );
}

export default App;