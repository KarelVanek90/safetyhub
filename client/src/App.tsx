import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Documents from "./pages/Documents";
import MainLayout from "./layouts/MainLayout";
import EmployeeDetail from "./pages/EmployeeDetail";
import EditEmployee from "./pages/EditEmployee";
import DocumentDetail from "./pages/DocumentDetail";
import EditDocument from "./pages/EditDocument";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/:id" element={<DocumentDetail />} />
          <Route path="/documents/:id/edit" element={<EditDocument />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
