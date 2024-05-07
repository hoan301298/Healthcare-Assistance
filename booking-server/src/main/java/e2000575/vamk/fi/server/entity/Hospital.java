package e2000575.vamk.fi.server.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Hospital {

    private String id;
    private String name;
    private String address;
    private String phone;
    private String website;
    
}
