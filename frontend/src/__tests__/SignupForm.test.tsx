import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SignupForm from "../pages/auth/SignupForm";

// Utiliser un wrapper pour éviter les erreurs liées à react-router-dom
const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Utiliser le fonction 'test' ou 'it' en ajoutant une déclaration d'importation
import { test, expect, it } from '@jest/globals';

test("Affiche les champs du formulaire", () => {
    renderWithRouter(<SignupForm />);

    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmer le mot de passe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Télécharger une photo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /S'inscrire/i })).toBeInTheDocument();
});

// Le test suivant manquait la déclaration 'test' ou 'it'
test("Affiche une erreur si les champs sont vides et on soumet", async () => {
    renderWithRouter(<SignupForm />);

    const submitButton = screen.getByRole("button", { name: /S'inscrire/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Le nom est requis/i)).toBeInTheDocument();
    expect(await screen.findByText(/L'email est requis/i)).toBeInTheDocument();
    expect(await screen.findByText(/Le mot de passe est requis/i)).toBeInTheDocument();
});

test("Affiche une erreur si le mot de passe est trop court", async () => {
    renderWithRouter(<SignupForm />);

    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    await userEvent.type(passwordInput, "123");

    const submitButton = screen.getByRole("button", { name: /S'inscrire/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Le mot de passe doit contenir au moins 6 caractères/i)).toBeInTheDocument();
});

test("Soumission réussie avec des valeurs valides", async () => {
    renderWithRouter(<SignupForm />);

    await userEvent.type(screen.getByLabelText(/Nom/i), "Doe");
    await userEvent.type(screen.getByLabelText(/Prénom/i), "John");
    await userEvent.type(screen.getByLabelText(/Email/i), "john.doe@example.com");
    await userEvent.type(screen.getByLabelText(/Mot de passe/i), "password123");
    await userEvent.type(screen.getByLabelText(/Confirmer le mot de passe/i), "password123");

    const submitButton = screen.getByRole("button", { name: /S'inscrire/i });
    fireEvent.click(submitButton);

    // Vérifie que l'inscription a été validée (exemple: message de succès ou redirection)
    expect(await screen.findByText(/Inscription réussie/i)).toBeInTheDocument();
});