import { motion } from 'framer-motion';
import { Calendar, Users, Zap } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const FeaturesSection = () => {
    const features = [
        {
            icon: <Calendar className="text-4xl text-white/80" />,
            title: "Événements",
            description: "Inscrivez-vous facilement aux événements qui vous intéressent et suivez leur évolution."
        },
        {
            icon: <Users className="text-4xl text-white/80" />,
            title: "Participants",
            description: "Rejoignez une communauté active d'artistes, organisateurs et passionnés d'événements."
        },
        {
            icon: <Zap className="text-4xl text-white/80" />,
            title: "Calendrier",
            description: "Explorez les événements à venir et ne manquez rien grâce à notre calendrier interactif."
        }
    ];

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            {features.map((feature, index) => (
                <FeatureCard 
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                />
            ))}
        </motion.div>
    );
};