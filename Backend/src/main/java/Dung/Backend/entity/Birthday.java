package Dung.Backend.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Birthday {

    private String day;


    private String month;


    private String year;

    public Birthday() {
    }
}
