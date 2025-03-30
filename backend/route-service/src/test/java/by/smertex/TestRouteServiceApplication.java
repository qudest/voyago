package by.smertex;

import org.springframework.boot.SpringApplication;

public class TestRouteServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(RouteServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
