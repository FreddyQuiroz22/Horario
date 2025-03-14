import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQsdw5xkM8O5h5gyt6zutFgBzhM_OseBg",
  authDomain: "horario-cfc2e.firebaseapp.com",
  projectId: "horario-cfc2e",
  storageBucket: "horario-cfc2e.appspot.com", // Corregido el dominio del storage
  messagingSenderId: "1082028626626",
  appId: "1:1082028626626:web:0f8b39ea75ab09e9c1615b",
  measurementId: "G-CC4QHV1YQW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Inicializa Firestore

export { db, analytics }; // Exporta db
