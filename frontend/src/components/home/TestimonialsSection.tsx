import { motion } from 'framer-motion';
import { TestimonialCard } from './TestimonialCard';

export const TestimonialsSection = () => {
    const testimonials = [
        {
            name: "Marie Dupont",
            role: "Participant à l'événement \"Art et Culture\"",
            content: "\"Un événement magnifique ! L'organisation était parfaite, et j'ai pu rencontrer des artistes incroyables. Merci Event Culture pour cette expérience inoubliable !\""
        },
        {
            name: "Jean Lefevre",
            role: "Organisateur de l'événement \"Tech Innovators\"",
            content: "\"La plateforme a été un vrai atout pour gérer mon événement. J'ai pu suivre en temps réel les inscriptions et les retours des participants. Très satisfait de l'outil !\""
        }
    ];

    return (
        <motion.div
            className="mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
        >
            <h3 className="text-3xl font-semibold text-white mb-8">Avis des utilisateurs</h3>
            <div className="space-y-8">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        name={testimonial.name}
                        role={testimonial.role}
                        content={testimonial.content}
                    />
                ))}
            </div>
        </motion.div>
    );
};