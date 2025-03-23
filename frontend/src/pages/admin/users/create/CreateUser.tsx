import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { UserFormData, userService } from "../../../../services/userService";
import UserForm from "./UserForm";

const CreateUser: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: UserFormData) => {
        setLoading(true);
        try {
            await userService.create(values);
            alert("Utilisateur créé avec succès !");
            // Ici, vous pourriez réinitialiser le formulaire ou rediriger
        } catch (err) {
            setError("Erreur lors de la création de l'utilisateur.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Créer un utilisateur">
            <UserForm
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
        </Layout>
    );
};

export default CreateUser;