import { motion } from 'framer-motion';

export const HeroSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Bienvenue dans Event Master
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8">
                Gérer, participer et découvrir des événements n'a jamais été aussi simple.
            </p>
        </motion.div>
    );
};