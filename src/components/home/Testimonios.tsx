import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonios = [
    {
        name: 'Familia Pérez',
        testimony: 'Mi hijo ama ir al jardín, todos los días vuelve feliz.',
        score: 5,
    },
    {
        name: 'Familia García',
        testimony: 'Las maestras son muy dedicadas y atentas.',
        score: 4.5,
    },
    {
        name: 'Familia López',
        testimony: 'Excelente ambiente y metodología de enseñanza.',
        score: 4.8,
    },
    {
        name: 'Familia Martínez',
        testimony: 'Mi hija ha aprendido muchísimo y se divierte cada día.',
        score: 5,
    },
];

export const Testimonios = () => {
    const totalScore = testimonios.reduce((acc, curr) => acc + curr.score, 0);
    const averageScore = (totalScore / testimonios.length).toFixed(1);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <section className="bg-gray-100 py-16 z-10">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    Lo que dicen las familias
                </h2>
                <div className="text-center mb-8">
                    <p className="text-5xl font-bold text-yellow-500">
                        {averageScore}
                    </p>
                </div>
                <Slider {...settings}>
                    {testimonios.map((testimonio, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl">
                            <p className="italic text-xl">
                                “{testimonio.testimony}”
                            </p>
                            <p className="text-l text-right mt-4">
                                – {testimonio.name}
                            </p>
                            <div className="flex justify-end mt-2">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <svg
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(testimonio.score) ? 'text-yellow-500' : 'text-gray-300'}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.967z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Testimonios;
