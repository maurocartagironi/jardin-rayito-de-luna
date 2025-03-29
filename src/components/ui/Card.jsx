export default function Card({ title, description, image, icon }) {
	return (
	  <div className="border-2 border-red-300 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 bg-white overflow-hidden text-center">
		{image ? (
		  <img
			src={image}
			alt={title}
			className="w-full h-48 object-cover rounded-t-2xl"
		  />
		) : (
		  <div className="w-16 h-16 mx-auto mt-6 mb-4 flex items-center justify-center rounded-full bg-red-100 text-3xl shadow-inner">
			{icon}
		  </div>
		)}
		<div className="px-6 pb-6">
		  <h3 className="text-xl font-semibold text-red-500 mb-2">{title}</h3>
		  <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
		</div>
	  </div>
	);
  }
  