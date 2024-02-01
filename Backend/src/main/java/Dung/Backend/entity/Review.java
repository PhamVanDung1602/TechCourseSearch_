package Dung.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name="review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_id")
    private Long reviewID;

    @Column(name="comment")
    private String comment;

    @Column(name="star_rating")
    private double star_rating;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name="user_id", nullable = false)
    private User user;
}
