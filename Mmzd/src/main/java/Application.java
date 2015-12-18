import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("mmzd")
@EnableAutoConfiguration
public class Application {
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(Application.class);
		app.run(args);
	}
}
