import { FC } from 'react';
import StatInfo from '../components/StatInfo';
import { stats } from '../data/stats';
import { HeroSection } from '../components/HeroSection';

const Homepage: FC = () => {
    return (
        <div>
            <HeroSection />
            <div className="bg-white py-14 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center px-4">
                {stats.map((stat, index) => (
                    <StatInfo key={index} {...stat} />
                ))}
            </div>
        </div>
    );
};

export default Homepage;
