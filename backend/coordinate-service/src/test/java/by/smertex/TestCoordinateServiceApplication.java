package by.smertex;

import org.springframework.boot.SpringApplication;

public class TestCoordinateServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(CoordinateServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
