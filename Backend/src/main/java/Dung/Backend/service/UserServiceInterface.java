package Dung.Backend.service;

import Dung.Backend.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserServiceInterface extends UserDetailsService {
    User findByEmail(String email);
}
