package Dung.Backend.service.user;

import Dung.Backend.dao.UserProfileRepository;
import Dung.Backend.dao.UserRepository;
import Dung.Backend.entity.User;
import Dung.Backend.entity.UserProfile;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    private final ObjectMapper objectMapper;

    public UserServiceImpl(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public ResponseEntity<?> updateUser(String email, JsonNode userJson) {
        try {
            User user = objectMapper.treeToValue(userJson, User.class);
            Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));

            if (userOptional.isEmpty()) {
                // User doesn't exist
                return ResponseEntity.notFound().build();
            }

            User existingUser = userOptional.get();

            if (!StringUtils.isBlank(user.getFullName())) {
                existingUser.setFullName(user.getFullName());
            }

            User updatedUser = userRepository.saveAndFlush(existingUser);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<?> updateUserProfile(String email, JsonNode userProfileJson) {
        try {
            UserProfile userProfile = objectMapper.treeToValue(userProfileJson, UserProfile.class);
            Optional<UserProfile> userProfileOptional = Optional.ofNullable(userProfileRepository.findByUserEmail(email));

            if (userProfileOptional.isEmpty()){
                return ResponseEntity.notFound().build();
            }

            UserProfile existingUserProfile = userProfileOptional.get();
            if (StringUtils.isNotBlank(userProfile.getGender())) {
                existingUserProfile.setGender(userProfile.getGender());
            }
            if (StringUtils.isNotBlank(userProfile.getDay())) {
                existingUserProfile.setDay(userProfile.getDay());
            }
            if (StringUtils.isNotBlank(userProfile.getMonth())) {
                existingUserProfile.setMonth(userProfile.getMonth());
            }
            if (StringUtils.isNotBlank(userProfile.getYear())) {
                existingUserProfile.setYear(userProfile.getYear());
            }
            if (StringUtils.isNotBlank(userProfile.getPhoneNumber())) {
                existingUserProfile.setPhoneNumber(userProfile.getPhoneNumber());
            }
            if (StringUtils.isNotBlank(userProfile.getAddress())) {
                existingUserProfile.setAddress(userProfile.getAddress());
            }

            userProfileRepository.saveAndFlush(existingUserProfile);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<?> getUserInfo(String email) {
        User user = userRepository.findByEmail(email);
        UserProfile userProfile = user.getUserProfile();

        if (user == null){
            // User doesn't exist
            return ResponseEntity.notFound().build();
        }
        Map<String, Object> response = new HashMap<>();
        response.put("fullName", user.getFullName());

        if (userProfile == null){
            return ResponseEntity.notFound().build();
        }

        response.put("gender", userProfile.getGender());
        response.put("phoneNumber", userProfile.getPhoneNumber());
        response.put("address", userProfile.getAddress());
        response.put("day", userProfile.getDay());
        response.put("month", userProfile.getMonth());
        response.put("year", userProfile.getYear());

        return ResponseEntity.ok(response);
    }

}
