package com.openclassrooms.mddapi;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MddApiApplication {
	  /**
     * Méthode principale de l'application.
     * <p>
     * Cette méthode lance l'application Spring Boot en utilisant {@link SpringApplication#run(Class, String...)}.
     *
     * @param args Les arguments de la ligne de commande.
     * @see SpringApplication#run(Class, String...)
     */

	public static void main(String[] args) {
		SpringApplication.run(MddApiApplication.class, args);
	}

}
