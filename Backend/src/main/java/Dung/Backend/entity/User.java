package Dung.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long userID;

    @Column(name="full_name")
    private String fullName;

    @Column(name="password")
    private String password;

    @Column(name="email")
    private String email;

    @Column(name="activated")
    private boolean activated;

    @Column(name="activation_code")
    private String activationCode;

    @OneToOne( mappedBy = "user",
            fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private UserProfile userProfile;

    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                CascadeType.DETACH, CascadeType.REFRESH, CascadeType.MERGE, CascadeType.PERSIST
            })
    @JoinTable(name="user_role",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id")
    )
    private List<Role> listRole;

    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
            }
    )
    private List<Review> reviewList;
}
