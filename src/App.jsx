// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ClientsPage from './pages/ClientsPage';
import ProductsPage from './pages/ProductsPage';
import ReceiptsPage from './pages/ReceiptsPage';
import DetailsPage from './pages/DetailsPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen">
        
        {/* Barra lateral */}
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Barra de navegación superior */}
          <Navbar />
          
          {/* Contenido principal */}
          <div className="flex-1 overflow-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/receipts" element={<ReceiptsPage />} />
              <Route path="/details" element={<DetailsPage />} />
            </Routes>
          </div>
        </div>
        
      </div>
    </Router>
  );
};

export default App;
