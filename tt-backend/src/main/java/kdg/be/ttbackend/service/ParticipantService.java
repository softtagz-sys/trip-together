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
        Optional<Group> groupOptional = groupRepository.findById(groupId);
        if (groupOptional.isPresent()) {
            Group group = groupOptional.get();
            if (group.getParticipants().size() < group.getMaxParticipants() || group.getMaxParticipants() == null) {
                participant.setGroup(group);
                return participantRepository.save(participant);
            } else {
                throw new IllegalStateException("The group has reached the maximum number of participants.");
            }
        } else {
            throw new IllegalArgumentException("Group not found.");
        }
    }

    public void removeParticipant(Long participantId, Long groupId) {
        Optional<Group> groupOptional = groupRepository.findById(groupId);
        if (groupOptional.isPresent()) {
            Group group = groupOptional.get();
            Optional<Participant> participantOptional = participantRepository.findById(participantId);
            if (participantOptional.isPresent()) {
                Participant participant = participantOptional.get();
                if (group.getParticipants().contains(participant)) {
                    group.getParticipants().remove(participant);
                    participantRepository.delete(participant);
                } else {
                    throw new IllegalArgumentException("Participant not found in the group.");
                }
            } else {
                throw new IllegalArgumentException("Participant not found.");
            }
        } else {
            throw new IllegalArgumentException("Group not found.");
        }
    }
}
