
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Página de Inscripción
 *
 * Muestra los requisitos, horarios disponibles y pasos para la inscripción
 *
 * @return {JSX.Element} Componente de la página de Inscripción
 */
/******  7db683e9-23d6-483f-8e32-7945d4c10682  *******/export default function Inscripcion() {
	return (
		<div className="max-w-6xl mx-auto px-4 py-12">
			<h2 className="text-3xl font-bold text-center mb-8 text-primary">Proceso de Inscripción</h2>
			<div className="grid md:grid-cols-2 gap-8">
				<div className="space-y-6">
				<div className="bg-white p-6 rounded-lg shadow-lg">
					<h3 className="text-xl font-semibold text-primary mb-4">Requisitos</h3>
					<ul className="space-y-3 text-gray-600">
					<li className="flex items-center gap-2">
						<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
						Copia del DNI del niño/a
					</li>
					<li className="flex items-center gap-2">
						<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
						Copia del DNI de los padres
					</li>
					<li className="flex items-center gap-2">
						<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
						Cartilla de vacunación
					</li>
					<li className="flex items-center gap-2">
						<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
						Certificado médico reciente
					</li>
					<li className="flex items-center gap-2">
						<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">✓</div>
						2 fotos tamaño carnet
					</li>
					</ul>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-lg">
					<h3 className="text-xl font-semibold text-primary mb-4">Horarios Disponibles</h3>
					<div className="space-y-3 text-gray-600">
					<p className="flex items-center gap-2">
						<span className="text-primary">🌅</span>
						Turno Mañana: 8:00 - 12:00
					</p>
					<p className="flex items-center gap-2">
						<span className="text-primary">☀️</span>
						Turno Tarde: 14:00 - 18:00
					</p>
					<p className="flex items-center gap-2">
						<span className="text-primary">📚</span>
						Jornada Completa: 8:00 - 18:00
					</p>
					</div>
				</div>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-lg">
				<h3 className="text-xl font-semibold text-primary mb-4">Pasos para la Inscripción</h3>
				<div className="space-y-4">
					<div className="flex gap-4">
					<div className="feature-icon shrink-0">
						<span className="text-xl">1️⃣</span>
					</div>
					<div>
						<h4 className="font-medium text-primary">Contacto Inicial</h4>
						<p className="text-gray-600">Agenda una visita para conocer nuestras instalaciones</p>
					</div>
					</div>
					<div className="flex gap-4">
					<div className="feature-icon shrink-0">
						<span className="text-xl">2️⃣</span>
					</div>
					<div>
						<h4 className="font-medium text-primary">Entrevista</h4>
						<p className="text-gray-600">Reunión con nuestro equipo pedagógico</p>
					</div>
					</div>
					<div className="flex gap-4">
					<div className="feature-icon shrink-0">
						<span className="text-xl">3️⃣</span>
					</div>
					<div>
						<h4 className="font-medium text-primary">Documentación</h4>
						<p className="text-gray-600">Presentación de los requisitos solicitados</p>
					</div>
					</div>
					<div className="flex gap-4">
					<div className="feature-icon shrink-0">
						<span className="text-xl">4️⃣</span>
					</div>
					<div>
						<h4 className="font-medium text-primary">Matrícula</h4>
						<p className="text-gray-600">Formalización de la inscripción y pago de matrícula</p>
					</div>
					</div>
				</div>
				<div className="mt-8">
					
					Solicitar Información
				</div>
				</div>
			</div>
		</div>
	);
}