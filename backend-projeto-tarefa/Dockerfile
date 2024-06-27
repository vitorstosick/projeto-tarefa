# Stage 1: Buildando a aplicação com Maven

# Definindo a imagem Maven com openJDK
FROM maven:3.8.4-openjdk-11 AS build

# Definindo o diretório de trabalho como /app
WORKDIR /app

# Copiando o arquivo local pom.xml para o diretorio /app do conteiner
COPY pom.xml .

# Copiando o diretorio local /src para o diretorio /app/src do conteiner
COPY src ./src

# Buildando aplicacao e copiando as dependencias
RUN mvn clean package -DskipTests && \
    mkdir -p dependency-jars && \
    mvn dependency:copy-dependencies -DoutputDirectory=dependency-jars

# Stage 2: Criando a imagem final com Tomcat

# Definindo a imagem Tomcat com openJDK
FROM tomcat:10.1-jdk11-openjdk-slim

# Removendo as aplicações default do Tomcat
RUN rm -rf /usr/local/tomcat/webapps/*

# Copiando o arquivo WAR (que contem o /src compilado) do estágio de build para o diretorio /webapps do Tomcat (e renomeando para ROOT.war)
COPY --from=build /app/target/backend-projeto-tarefa-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# Copiando as dependencias do estagio de build para o diretorio /lib do Tomcat
COPY --from=build /app/dependency-jars /usr/local/tomcat/lib/

# Copiando o context.xml do diretorio local para o diretorio /conf do Tomcat
COPY src/main/webapp/META-INF/Context.xml /usr/local/tomcat/conf/context.xml

# Expondo a porta 8080
EXPOSE 8080

# Executando o Tomcat
CMD ["catalina.sh", "run"]