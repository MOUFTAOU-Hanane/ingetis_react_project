const jwt = require('jsonwebtoken');
require('dotenv').config(); // Charger les variables d'environnement

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Récupérer le token dans les headers

    if (!token) {
        return res.status(401).json({ error: "Accès refusé, token manquant." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Stocker l'utilisateur décodé dans `req.user`
        next(); // Passer à la suite
    } catch (error) {
        res.status(403).json({ error: "Token invalide ou expiré." });
    }
};

module.exports = authMiddleware;
