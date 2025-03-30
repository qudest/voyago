package by.smertex;

import org.springframework.boot.SpringApplication;

public class TestAccountServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(AccountServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
