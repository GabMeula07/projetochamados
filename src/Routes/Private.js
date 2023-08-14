import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function Private({ children }) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }
  // se não tiver logado
  if (!signed) {
    return <Navigate to="/" />;
  }
  //se tiver logado
  return children;
}
