package Dung.Backend.controller;


import Dung.Backend.service.user.UserServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from 'http://localhost:3000'
@RequestMapping("/user-info")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/updateUserFullName")
    public ResponseEntity<?> updateUser(@RequestParam String email,@RequestBody JsonNode userJson) {
        ResponseEntity<?> response = userService.updateUser(email,userJson);
        return response;
    }

    @PostMapping("/updateUserDetails")
    public ResponseEntity<?> updateUserProfile(@RequestParam String email, @RequestBody JsonNode userProfileJson) {
        ResponseEntity<?> response = userService.updateUserProfile(email, userProfileJson);
        return response;
    }

    @GetMapping("/getUserInfo")
    public ResponseEntity<?> getUserInfo(@RequestParam String email){
        ResponseEntity<?> response = userService.getUserInfo(email);
        return response;
    }

}
