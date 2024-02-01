package Dung.Backend.dao;

import Dung.Backend.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="user_profile")
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
}
