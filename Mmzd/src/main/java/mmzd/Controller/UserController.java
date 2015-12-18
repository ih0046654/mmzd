package mmzd.Controller;

import mmzd.model.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	@RequestMapping("/user")
	public User view(Long id) {
		User user = new User();
		id = (long) 1;
		user.setId(id);
		user.setName("zhang1");
		return user;
	}

}
