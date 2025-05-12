import { Navigate } from "react-router-dom";
import { isAdmin } from "./isAdmin";

// Skyddad rutt som kontrollerar om användaren är inloggad och är admin
export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const userIsAdmin = isAdmin();
  
  // Om användaren inte har ett token (inte inloggad) - omdirigera till login
  if (!token) {
    return <Navigate to="/Login-Register" replace />;
  }
  
  // Om användaren är inloggad men inte admin - omdirigera till startsidan
  if (!userIsAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // Om användaren är inloggad och är admin - visa admin-komponenten
  return children;
}