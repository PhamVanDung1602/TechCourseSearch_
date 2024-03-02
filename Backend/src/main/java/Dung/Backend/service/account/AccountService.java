package Dung.Backend.service.account;

import Dung.Backend.dao.RoleRepository;
import Dung.Backend.dao.UserProfileRepository;
import Dung.Backend.dao.UserRepository;
import Dung.Backend.entity.Notification;
import Dung.Backend.entity.Role;
import Dung.Backend.entity.User;
import Dung.Backend.entity.UserProfile;
import Dung.Backend.service.email.EmailService;
import Dung.Backend.service.jwt.JWTResponse;
import Dung.Backend.service.jwt.JWTService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;


    //register new user
    public ResponseEntity<?> registerNewUser(User user){

        //Check weather email has already been existed
        if (userRepository.existsByEmail(user.getEmail())){
            return ResponseEntity.badRequest().body(new Notification("Email đã tồn tại"));
        }


        //Encode password
        String encryptPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptPassword);

        //Attach and send activation information
        user.setActivationCode(createActivationCode());
        user.setActivated(false);

        //Send email to user for activation
        sendActivationCodeToEmail(user.getEmail(), user.getActivationCode());

        //create user profile
        UserProfile userProfile = new UserProfile();
        userProfile.setGender("Unknown");
        userProfile.setDay("Unknown");
        userProfile.setMonth("Unknown");
        userProfile.setYear("Unknown");
        userProfile.setPhoneNumber("Unknown");
        userProfile.setAddress("Unknown");
        userProfile.setAvatar("Unknown");

        //Save user to the db
        user.setUserProfile(userProfile);
        User registedUser = userRepository.save(user);



        userProfile.setUser(registedUser);
        userProfileRepository.save(userProfile);

        //get email
        String email = registedUser.getEmail();
        String activationCode = registedUser.getActivationCode();
        return ResponseEntity.ok(new ActivationCodeEmail(email, activationCode));
    }


    //activate new account
    private String createActivationCode(){
        //create random code
            String generatedString = RandomStringUtils.randomAlphanumeric(6);
            return generatedString;
    }

    private void sendActivationCodeToEmail(String email,String activationCode){
        String subject = "Kích hoạt tài khoản của bạn tại DP website";
        String text = "Vui lòng sử dụng mã sau để kích hoạt cho tài khoản <"+email+">:" +
                "<html> <body> <br/><h1>"+activationCode+"<h1/> <body/> <html/>";

        emailService.sendMessage("dungrunggiung@gmail.com", email, subject, text);
    }
    public ResponseEntity<?> activateNewAccount(String email, String activationCode){
        User user = userRepository.findByEmail(email);

        //check whether the user has been existed
        if(user==null){
            return ResponseEntity.badRequest().body(new Notification("Người dùng không tồn tại!"));
        }

        //check whether account has been activated
        if (user.isActivated()){
            return ResponseEntity.badRequest().body(new Notification("Tài khoản đã được kích hoạt trước đó!"));
        }

        //handle activating account
        if (activationCode.equals(user.getActivationCode())){
            user.setActivated(true);
            Role role = roleRepository.findByRoleName("USER");
            user.getListRole().add(role);

            userRepository.save(user);

            String token = jwtService.generateToken(user.getEmail());
            String message = "Đăng ký thành công!";

            return ResponseEntity.ok(new RegistrationResponse(token,message));
        } else {
            return ResponseEntity.badRequest().body(new Notification("Mã kích hoạt không chính xác!"));
        }
    }

}
