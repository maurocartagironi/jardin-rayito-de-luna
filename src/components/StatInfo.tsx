import StatItem from '../types/StatItem';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

export default function StatInfo(stat: StatItem, key: number) {
    const Icon = stat.icon;
    return (
        <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: key * 0.1 }}
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
}
