import "./singup.css";
import { useContext, useState } from "react";

import logo from "../../Assets/imgs/logo1.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { singUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (email !== "" && password !== "" && username !== "") {
      await singUp(email, password, username);
    } else {
      alert("Você precisa preencher todos os campos");
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo do sistema de chamados" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Nova conta</h1>

          <input
            type="text"
            placeholder="Nome"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

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
            {loadingAuth ? <div className="loader1"></div> : "Cadastrar"}
          </button>
        </form>
        <Link to="/"> Já possui uma conta? Faça login </Link>
      </div>
    </div>
  );
}
