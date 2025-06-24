import Layout from "../components/Layout";
import { ShieldCheck, FileText, Mail } from "lucide-react";

const PrivacyPolicy = () => {
    return (
        <Layout title="Politique de Confidentialité">
            <div className="space-y-6 text-white">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-yellow-300" />
                    <h2 className="text-2xl font-semibold">Protection des données</h2>
                </div>
                <p>
                    Nous respectons votre vie privée et nous nous engageons à protéger vos
                    données personnelles. Cette politique décrit la manière dont nous
                    collectons, utilisons et sécurisons vos informations.
                </p>
                <p>
                    Nous utilisons vos données uniquement pour améliorer nos services et ne
                    les partageons pas sans votre consentement.
                </p>
            </div>
        </Layout>
    );
};

const TermsOfService = () => {
    return (
        <Layout title="Conditions d'Utilisation">
            <div className="space-y-6 text-white">
                <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-yellow-300" />
                    <h2 className="text-2xl font-semibold">Conditions générales</h2>
                </div>
                <p>
                    En accédant et en utilisant notre plateforme, vous acceptez les
                    conditions suivantes. Toute utilisation abusive entraînera des mesures
                    appropriées.
                </p>
                <p>
                    Nous nous réservons le droit de modifier ces termes à tout moment.
                    Veuillez les consulter régulièrement.
                </p>
            </div>
        </Layout>
    );
};

const Contact = () => {
    return (
        <Layout title="Contact">
            <div className="space-y-6 text-white">
                <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-yellow-300" />
                    <h2 className="text-2xl font-semibold">Nous contacter</h2>
                </div>
                <p>
                    Pour toute question ou assistance, vous pouvez nous contacter à
                    l'adresse suivante :
                </p>
                <p className="font-semibold">support@eventmaster.com</p>
                <p>
                    Nous nous efforçons de répondre dans les plus brefs délais.
                </p>
            </div>
        </Layout>
    );
};

export { PrivacyPolicy, TermsOfService, Contact };
