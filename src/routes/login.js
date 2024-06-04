import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreenComponent/LoadingScreenComponent";
import axios from "axios";
import Swal from "sweetalert2";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const iniciaSesion = (e) => {
    setIsLoading(true);
    e.preventDefault();
    axios
      .post(
        "https://vds-app-vtreu.ondigitalocean.app/login/",
        {
          username: user,
          password: pass,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["access"]}`;

        setIsLoading(false);
        navigate("/menu");
      })
      .catch((error) => {
        setIsLoading(false);
        Swal.fire({
          title: "Error",
          text: "Usuario o contraseña incorrectos",
          icon: "error",
          iconColor: "#1ccda0",
          confirmButtonColor: "#0da290",
        });
      });
  };

  return (
    <div>
      <header className="header-main-login">
        <h1>Inicio de Sesion</h1>
      </header>
      <div className="cards-container-reverse">
        <form className="form-busqueda-login" onSubmit={iniciaSesion}>
          <label>Usuario:</label>
          <input
            className="input-field"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Nombre del usuario"
          />
          <label>Contraseña:</label>
          <input
            className="input-field"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Contraseña del usuario"
          />
          <button type="submit" className="button-buscar">
            Iniciar sesion
          </button>
        </form>

        <img src="Logo.png" className="logo" alt="CompanyLogo"></img>
      </div>
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default Login;
