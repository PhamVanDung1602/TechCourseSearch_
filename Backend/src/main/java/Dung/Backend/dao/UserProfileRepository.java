package Dung.Backend.dao;

import Dung.Backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="user_profile")
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    @Query("SELECT up FROM UserProfile up JOIN up.user u WHERE u.email = :email")
    UserProfile findByUserEmail(@Param("email") String email);
}
