import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "../pages";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MasterLayout from "../pages/layouts/MasterLayout";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<MasterLayout />}>
          <Route index element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
