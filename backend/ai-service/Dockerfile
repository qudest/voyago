FROM eclipse-temurin:21-jdk-alpine AS build

WORKDIR /app
COPY src    src
COPY gradle  gradle
COPY build.gradle settings.gradle gradlew ./

RUN chmod +x gradlew
RUN ./gradlew build -x test

FROM eclipse-temurin:21-jdk-alpine
ARG JAR_FILE_DIR=/app/build/libs
COPY --from=build $JAR_FILE_DIR/*.jar /app/jar/ai-service.jar

ENTRYPOINT ["java","-jar","/app/jar/ai-service.jar"]