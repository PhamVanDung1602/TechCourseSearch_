package Dung.Backend.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="user_profile")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_profile_id")
    private Long userprofileID;

    @Column(name="full_name")
    private String fullName;

    @Column(name="birth_day")
    @Embedded
    private Birthday birthDay;

    @Column(name="address")
    private String address;

    @Column(name="gender")
    private String gender;

    @Column(name="phone_number")
    private String phoneNumber;


    @Column(name="avatar", columnDefinition = "LONGTEXT")
    @Lob
    private String avatar;

    @OneToOne(fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name="user_id")
    private User user;
}
