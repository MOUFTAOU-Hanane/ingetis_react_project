import { motion } from 'framer-motion';

export const FinalCallToAction = () => {
    return (
        <motion.div
            className="mt-16 text-center py-12 bg-gradient-to-r from-yellow-600 via-indigo-600 to-blue-600 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
        >
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                Commencez cette aventure avec nous !
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
                Rejoignez une communauté passionnée par la gestion d'événements et l'innovation. Que vous soyez un organisateur ou un participant, il y a une place pour vous.
            </p>
            <div>
                <a
                    href="/login"
                    className="inline-block bg-white text-yellow-600 hover:bg-yellow-100 px-8 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 mb-4 md:mb-0 md:mr-6"
                >
                    Se connecter
                </a>
                <a
                    href="/register"
                    className="inline-block bg-green-600 text-white hover:bg-green-700 px-8 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                    Vous avez déjà un compte ? Continuer
                </a>
            </div>
        </motion.div>
    );
};