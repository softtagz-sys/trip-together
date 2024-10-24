package kdg.be.ttbackend.domain;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String destination;
    private TransportType transportType;
    private Integer maxParticipants;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Participant> participants;

    public Group() {
    }

    public Group(String destination, TransportType transportType) {
        this.destination = destination;
        this.transportType = transportType;
    }

    public Group(String destination, TransportType transportType, Integer maxParticipants) {
        this.destination = destination;
        this.transportType = transportType;
        this.maxParticipants = maxParticipants;
    }
}
