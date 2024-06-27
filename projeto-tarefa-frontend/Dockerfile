# Definindo a imagem node com alpine
FROM node:alpine

# Definindo o diretório de trabalho como /app
WORKDIR /app

# Copiando as dependencias para o diretorio /app do conteiner
COPY package*.json .

# Instala as dependencias criando a pasta node_modules
RUN npm install

# Instalando a CLI do Angular para poder usar os comandos "ng"
RUN npm install -g @angular/cli

# Copiando todo o resto do projeto para o diretorio /app do conteiner
COPY . .

# Expondo a porta 4200 (porta padrao do Angular)
EXPOSE 4200

# Executando a aplicacao Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]
