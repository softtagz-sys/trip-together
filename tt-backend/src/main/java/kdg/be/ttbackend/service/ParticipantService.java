package kdg.be.ttbackend.service;

import kdg.be.ttbackend.domain.Group;
import kdg.be.ttbackend.domain.Participant;
import kdg.be.ttbackend.repository.GroupRepository;
import kdg.be.ttbackend.repository.ParticipantRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final GroupRepository groupRepository;

    public ParticipantService(ParticipantRepository participantRepository, GroupRepository groupRepository) {
        this.participantRepository = participantRepository;
        this.groupRepository = groupRepository;
    }

    public Participant addParticipant(Participant participant, Long groupId) {
        Optional<Group> group = groupRepository.findById(groupId);
        group.ifPresent(participant::setGroup);
        return participantRepository.save(participant);
    }

    //TODO: removeParticipant
}
