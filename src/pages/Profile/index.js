import Header from "../../components/Header";
import Title from "../../components/Title";
import avatar from "../../Assets/imgs/avatar.png";

import "./profile.css";

import firebase from "../../services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { FiSettings, FiUpload } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, setUser, storageUser, Logout } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        toast.warn("Envie uma imagem do tipo PNG ou JPEG");
        setImageAvatar(null);
        return;
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;
    //referencia do storage
    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

    //atualização do banco de dados
    const uploadTask = uploadBytes(uploadRef, imageAvatar).then((snapshot) => {
      //pega a url do banco de dados de  imagem
      getDownloadURL(snapshot.ref).then(async (donwloadURL) => {
        let urlFoto = donwloadURL;

        const docRef = doc(db, "Users", user.uid);

        await updateDoc(docRef, {
          avatarUrl: urlFoto,
          nome: nome,
        }).then(() => {
          let data = {
            ...user,
            nome: nome,
            avatarUrl: urlFoto,
          };
          setUser(data);
          storageUser(data);
          toast.success("Atualizado com sucesso");
        });
      });
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (imageAvatar === null && nome !== "") {
      //Atualizar apenas o nome

      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, {
        nome: nome,
      }).then(() => {
        let data = {
          ...user,
          nome: nome,
        };

        setUser(data);
        storageUser(data);
        toast.success("Atualizado com sucesso");
      });
    } else if (nome !== "" && imageAvatar !== null) {
      //atualizar tudo
      handleUpload();
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Meu perfil">
          <FiSettings color="#000" size={25} />
        </Title>

        <div className="container">
          <form onSubmit={handleSubmit} className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />{" "}
              <br />
              {avatarUrl === null ? (
                <img
                  src={avatar}
                  alt="foto de perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="foto de perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />

            <label>Email</label>
            <input type="email" value={email} disabled={true} />

            <button type="submit">Atualizar</button>
          </form>
        </div>

        <div className="container">
          <button onClick={Logout} className="logout-btn">
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
