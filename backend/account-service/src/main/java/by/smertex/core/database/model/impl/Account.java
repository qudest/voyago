package by.smertex.core.database.model.impl;

import by.smertex.core.database.model.AbstractEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "account", schema = "account")
@SequenceGenerator(name = "account_seq", sequenceName = "account_seq", allocationSize = 3)
public class Account implements AbstractEntity<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_seq")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "premium")
    private Boolean premium;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "credit_card")
    private String creditCard;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "account_preferences", schema = "account",
            joinColumns = @JoinColumn(name = "account_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "preference")
    private List<Preference> preferences;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Account account = (Account) o;
        return Objects.equals(id, account.id) && Objects.equals(phoneNumber, account.phoneNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, phoneNumber);
    }
}
