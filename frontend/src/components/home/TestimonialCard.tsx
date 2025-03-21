import { MessageCircle } from 'lucide-react';

interface TestimonialCardProps {
    name: string;
    role: string;
    content: string;
}

export const TestimonialCard = ({ name, role, content }: TestimonialCardProps) => {
    return (
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <div className="flex items-center mb-4">
                <MessageCircle className="text-2xl text-white/80 mr-4" />
                <div>
                    <p className="text-white font-semibold">{name}</p>
                    <p className="text-white/90 text-sm">{role}</p>
                </div>
            </div>
            <p className="text-white/90">{content}</p>
        </div>
    );
};