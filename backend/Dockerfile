# Étape 1 : base image
FROM node:18-alpine

# Étape 2 : répertoire de travail
WORKDIR /app

# Étape 3 : copier les fichiers
COPY package*.json ./
RUN npm install

COPY . .

# Étape 4 : exposer le port (par ex 5000)
EXPOSE 3005

# Étape 5 : commande de lancement
CMD ["npm", "run", "start"]
