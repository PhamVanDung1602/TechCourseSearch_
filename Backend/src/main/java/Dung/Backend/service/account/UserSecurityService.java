package Dung.Backend.service.account;

import Dung.Backend.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserSecurityService extends UserDetailsService {
    User findByEmail(String email);
}
