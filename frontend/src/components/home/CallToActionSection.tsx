import { motion } from 'framer-motion';

export const CallToActionSection = () => {
    return (
        <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
        >
            <p className="text-lg md:text-xl text-white/90">
                Vous êtes organisateur ? Créez facilement des événements, gérez les inscriptions et l'expérience de vos participants.
            </p>
            <a
                href="/"
                className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
                Créez un événement
            </a>
        </motion.div>
    );
};