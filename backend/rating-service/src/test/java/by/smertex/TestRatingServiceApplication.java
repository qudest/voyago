package by.smertex;

import org.springframework.boot.SpringApplication;

public class TestRatingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(RatingServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
