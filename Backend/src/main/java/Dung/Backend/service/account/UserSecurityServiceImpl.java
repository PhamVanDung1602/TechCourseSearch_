package Dung.Backend.service.account;

import Dung.Backend.dao.UserProfileRepository;
import Dung.Backend.dao.UserRepository;
import Dung.Backend.entity.Role;
import Dung.Backend.entity.User;
import Dung.Backend.entity.UserProfile;
import Dung.Backend.exception.ActivationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserSecurityServiceImpl implements UserSecurityService {
    private UserRepository userRepository;

    @Autowired
    public UserSecurityServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = findByEmail(email);

        if (user == null){
            throw new UsernameNotFoundException("Tài khoản không tồn tại!");
        }

        if (!user.isActivated()){
            throw new ActivationException("Tài khoản chưa được kích hoạt để đăng nhập!");
        }

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                rolesToAuthorities(user.getListRole()));
    }

    private Collection<? extends GrantedAuthority> rolesToAuthorities(List<Role> roles){
        return roles.stream().map(
                role -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());
    }
}
