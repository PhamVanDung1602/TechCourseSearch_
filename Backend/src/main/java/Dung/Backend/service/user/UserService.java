package Dung.Backend.service.user;


import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<?> updateUser(String email, JsonNode userJson);

   ResponseEntity<?> updateUserProfile(String email,JsonNode userProfileJson);

   ResponseEntity<?> getUserInfo(String email);
}
