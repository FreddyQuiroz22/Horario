import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [modoSalida, setModoSalida] = useState(false);

  useEffect(() => {
    const verificarModo = () => {
      const ahora = new Date();
      const horaActual = ahora.getHours();

      console.log(`Hora actual: ${horaActual}`);

      const horaLimiteEntrada = 18;
      if (horaActual >= horaLimiteEntrada || horaActual < 6) {
        setModoSalida(true);
        console.log("Modo: Salida");
      } else {
        setModoSalida(false);
        console.log("Modo: Entrada");
      }
    };

    verificarModo();
    const intervalo = setInterval(verificarModo, 60000);

    return () => clearInterval(intervalo);
  }, []);

  const handleRegistro = async () => {
    if (!cedula) {
      alert("Por favor, ingresa tu número de cédula.");
      return;
    }

    try {
      const ahora = new Date();
      const fecha = ahora.toISOString().split("T")[0];
      const hora = ahora.toLocaleTimeString();

      if (!modoSalida) {
        const registrosRef = collection(db, "registros");
        const consulta = query(registrosRef, where("nombre", "==", nombre), where("cedula", "==", cedula), where("fecha", "==", fecha));
        const resultado = await getDocs(consulta);

        if (!resultado.empty) {
          alert("Ya registraste tu entrada hoy.");
          return;
        }
      }

      await addDoc(collection(db, "registros"), {
        nombre,
        cedula,
        fecha,
        hora,
        tipo: modoSalida ? "Salida" : "Entrada",
      });

      alert("Registro exitoso.");
      setNombre("");
      setCedula("");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    
    <div className="flex items-center justify-center h-screen bg-skyblue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-20 relative">
        {/* Imagen */}
        <img
          src="./qchuzos.jpg"
          alt="Registro"
          className="w-32 h-32 mx-auto mb-4 rounded-full object-cover shadow-md"
        />
        
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Registro de {modoSalida ? "Salida" : "Entrada"}
        </h1>
        
        <input
          type="text"
          placeholder="Ingrese su Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-2 w-full border rounded-lg mb-4 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br/>
        <input
          type="text"
          placeholder="Ingrese su cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          className="p-2 w-full border rounded-lg mb-4 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <br/>
        
        <button
          onClick={handleRegistro}
          className={`w-full p-3 rounded-lg text-white font-bold transition-all ${
            modoSalida ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {modoSalida ? "Registrar Salida" : "Registrar Entrada"}
        </button>
      </div>
    </div>
  );
  
};

export default Registro;
