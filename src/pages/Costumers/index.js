import { FiUser } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./costumers.css";
import { useState } from "react";
import { db } from "../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Costumers() {
  const [cliente, setCliente] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    if (cliente !== "" && cnpj !== "" && endereco !== "") {
      await addDoc(collection(db, "customers"), {
        nomeFantasia: cliente,
        cnpj: cnpj,
        endereco: endereco,
      }).then(() => {
        setCliente("");
        setCnpj("");
        setEndereco("");
        toast.success("cliente cadastrado com sucesso");
      });
    } else {
      toast.warn("Você precisa preencher todos os campos");
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Clientes">
          <FiUser color="#000" size={25} />
        </Title>

        <div className="container">
          <form onSubmit={handleRegister} className="form-profile">
            <label>Nome fantasia</label>
            <input
              type="text"
              placeholder="Nome fantasia "
              value={cliente}
              onChange={(e) => {
                setCliente(e.target.value);
              }}
            />

            <label>CNPJ</label>
            <input
              type="text"
              placeholder="CNPJ da empresa"
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value);
              }}
            />

            <label>Endereço</label>
            <input
              type="text"
              placeholder="Endereço da empresa"
              value={endereco}
              onChange={(e) => {
                setEndereco(e.target.value);
              }}
            />
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
