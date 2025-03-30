package by.smertex;

import org.springframework.boot.SpringApplication;

public class TestMapServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(MapServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
