import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
	Users,
	GraduationCap,
	Home,
	CalendarCheck
  } from "lucide-react";

export default function Homepage() {

	const stats = [
		{
		  value: 30,
		  title: "Niños y niñas",
		  icon: Users,
		  description: "Espacio para crecer juntos",
		},
		{
		  value: 6,
		  title: "Docentes dedicadas",
		  icon: GraduationCap,
		  description: "Formación en educación inicial",
		},
		{
		  value: 4,
		  title: "Salas equipadas",
		  icon: Home,
		  description: "Ambientes seguros y creativos",
		},
		{
		  value: 2025,
		  title: "Año de apertura",
		  icon: CalendarCheck,
		  description: "¡Un comienzo lleno de ilusión!",
		},
	  ];

	  return (
		<div>
		  {/* Imagen de fondo con overlay y contenido */}
		  <div
			className="relative h-[400px] w-full bg-cover bg-center"
			style={{
			  backgroundImage: `url('https://images.unsplash.com/photo-1655087751325-1aba19f6dd16')`,
			}}
		  >
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/75 z-0" />
	  
			{/* Contenido */}
			<div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-white text-center flex flex-col justify-center h-full">
			  <h1 className="text-4xl md:text-6xl font-bold mb-6 rainbow-text">
				Mi Rayito de Luna
			  </h1>
			  <h2 className="text-2xl md:text-3xl font-semibold mb-4">
				Bienvenidos a nuestra familia
			  </h2>
			  <p className="text-lg md:text-xl mb-6">
				En Mi Rayito de Luna, creemos en nutrir el potencial único de cada
				niño a través del juego, el aprendizaje y el descubrimiento.
			  </p>
			  <div className="space-y-4 text-left mx-auto max-w-2xl">
				<div className="flex items-center gap-3">
				  <div className="text-2xl">🎨</div>
				  <div>
					<h3 className="font-medium text-white">Creatividad sin límites</h3>
					<p className="text-white/80">Espacios diseñados para la imaginación</p>
				  </div>
				</div>
				<div className="flex items-center gap-3">
				  <div className="text-2xl">🌱</div>
				  <div>
					<h3 className="font-medium text-white">Desarrollo integral</h3>
					<p className="text-white/80">Educación personalizada y atención dedicada</p>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
	  
		  {/* Estadísticas con animación */}
		  <div className="bg-white py-16">
			<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center px-4">
			  {stats.map((stat, index) => {
				const Icon = stat.icon;
				return (
				  <motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: index * 0.1 }}
					viewport={{ once: true, amount: 0.4 }}
				  >
					<h2 className="text-5xl font-bold text-gray-800 mb-2">
					  <CountUp end={stat.value} duration={2} />
					</h2>
					<h3 className="text-lg font-medium text-red-500 mb-1">
					  {stat.title}
					</h3>
					<div className="flex justify-center mb-2">
					  <Icon className="h-8 w-8 text-red-400" />
					</div>
					<p className="text-gray-500 text-sm leading-relaxed">
					  {stat.description}
					</p>
				  </motion.div>
				);
			  })}
			</div>
		  </div>
		</div>
	  );
}