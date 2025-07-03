# Étape 1 : Build de l'app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Étape 2 : Serveur web avec nginx
FROM nginx:stable-alpine

# Copie du build React vers nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Supprimer la config nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Ajouter le propre config nginx
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
