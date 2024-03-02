package Dung.Backend.controller;

import Dung.Backend.entity.User;
import Dung.Backend.service.jwt.BlackListToken;
import Dung.Backend.service.jwt.JWTResponse;
import Dung.Backend.service.account.LoginRequest;
import Dung.Backend.service.account.AccountService;
import Dung.Backend.service.jwt.JWTService;
import Dung.Backend.service.account.UserSecurityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from 'http://localhost:3000'
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private UserSecurityServiceImpl userSecurityServiceImpl;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    //register new account
    @PostMapping("/register")
    public ResponseEntity<?> registerNewUser(@Validated @RequestBody User user){
        ResponseEntity<?> response = accountService.registerNewUser(user);
        return response;
    }

    //activate new account through email
    @GetMapping("/activate")
    public ResponseEntity<?> activateNewAccount(@RequestParam String email,@RequestParam String activationCode){
        ResponseEntity<?> response = accountService.activateNewAccount(email, activationCode);
        return response;
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        //authenticate user by email and password
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            // if authentication is successful
            if (authentication.isAuthenticated()){
                final String jwt = jwtService.generateToken(loginRequest.getEmail());
                return ResponseEntity.ok(new JWTResponse(jwt));
            }
        }catch(AuthenticationException e) {
            //is not successful
            return ResponseEntity.badRequest().body("Email hoặc mật khẩu không chính xác!");
        }
        return ResponseEntity.badRequest().body("Xác thực không thành công!");
    }

    //logout
    @Autowired
    private BlackListToken blackListToken;

    @PostMapping("/logout")
    public void logout(@RequestParam("token") String token){
        if(token!=null){
            blackListToken.addToBlackList(token);
        }
    }






}
