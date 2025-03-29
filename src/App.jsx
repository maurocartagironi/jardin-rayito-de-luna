
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import Homepage from "@/pages/Homepage";
import Actividades from "@/pages/Actividades";
import Instalaciones from "@/pages/Instalaciones";
import Galeria from "@/pages/Galeria";
import SobreNosotros from "@/pages/SobreNosotros";
import Inscripcion from "@/pages/Inscripcion";
import Noticias from "@/pages/Noticias";
import Contactanos from "@/pages/Contactanos";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pages = {
	home: Homepage,
	actividades: Actividades,
	instalaciones: Instalaciones,
	galeria: Galeria,
	inscripcion: Inscripcion,
	noticias: Noticias,
	contactanos: Contactanos,
	sobrenosotros: SobreNosotros,
};
	
const menuItems = [
  { id: "home", label: "Home" },
  { id: "actividades", label: "Actividades" },
  { id: "instalaciones", label: "Instalaciones" },
  { id: "galeria", label: "Galería" },
  { id: "sobrenosotros", label: "Sobre Nosotros" },
  { id: "inscripcion", label: "Inscripción" },
  { id: "noticias", label: "Noticias" },
  { id: "contactanos", label: "Contáctanos" },
];

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const CurrentPageComponent = pages[currentPage];

  return (
    <div className="min-h-screen bg-background font-rayito">
		<Header
			currentPage={currentPage}
			setCurrentPage={setCurrentPage}
			isMenuOpen={isMenuOpen}
			setIsMenuOpen={setIsMenuOpen}
			menuItems={menuItems}
		/>

		<AnimatePresence mode="wait">
			<motion.div
			key={currentPage}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			>
			<CurrentPageComponent />
			</motion.div>
		</AnimatePresence>
		<Footer />
	</div>	
  );
}

export default App;
