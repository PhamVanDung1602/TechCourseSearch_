package Dung.Backend.controller;

import Dung.Backend.entity.User;
import Dung.Backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from 'http://localhost:3000'
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

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




}
