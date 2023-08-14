import "./singin.css";
import { useState, useContext } from "react";

import logo from "../../Assets/imgs/logo1.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

export default function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { singIn, loadingAuth } = useContext(AuthContext);

  async function handleSingIn(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      await singIn(email, password);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo do sistema de chamados" />
        </div>

        <form onSubmit={handleSingIn}>
          <h1>Entrar</h1>

          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">
            {loadingAuth ? <div className="loader1"></div> : "Acessar"}
          </button>
        </form>
        <Link to="/register">Criar uma conta </Link>
      </div>
    </div>
  );
}
