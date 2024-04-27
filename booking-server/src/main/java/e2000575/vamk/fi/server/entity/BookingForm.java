package e2000575.vamk.fi.server.entity;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "appointment_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingForm {

    @Id
    private String id;
    private String username;
    private String patientName;
    private String email;
    private List<Hospital> hospital;
    private String phone;
    private String date;
    private String time;

    @CreatedDate
    private LocalDate createdAt;
}
