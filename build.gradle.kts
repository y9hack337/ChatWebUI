plugins {
    java
    id("org.springframework.boot") version "3.2.5"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.23"
}

group = "com.hack337"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
    maven { url = uri("https://www.webjars.org/m2") }
}

dependencies {
    // Spring Boot Starters
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-webflux") // For WebClient

    // Database
    implementation("com.h2database:h2")

    // JWT
    implementation("io.jsonwebtoken:jjwt-api:0.12.5")
    implementation("io.jsonwebtoken:jjwt-impl:0.12.5")
    implementation("io.jsonwebtoken:jjwt-jackson:0.12.5")
    compileOnly("io.jsonwebtoken:jjwt-impl:0.12.5")
    annotationProcessor("io.jsonwebtoken:jjwt-impl:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.5")

    // Lombok (Optional but convenient)
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    // Testing
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine") // Exclude JUnit 4
    }
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation(kotlin("test"))

    // Web UI Helpers (for Markdown/Code formatting - add more as needed)
    implementation("org.webjars:bootstrap:5.3.2")
    implementation("org.webjars:jquery:3.7.1")
    implementation("org.webjars.npm:marked:4.3.0")
    implementation("org.webjars.npm:highlight.js:11.9.0")
}