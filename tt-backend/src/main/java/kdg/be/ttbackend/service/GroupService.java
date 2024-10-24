package kdg.be.ttbackend.service;

import kdg.be.ttbackend.domain.Group;
import kdg.be.ttbackend.domain.Room;
import kdg.be.ttbackend.repository.GroupRepository;
import kdg.be.ttbackend.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final RoomRepository roomRepository;

    public GroupService(GroupRepository groupRepository, RoomRepository roomRepository) {
        this.groupRepository = groupRepository;
        this.roomRepository = roomRepository;
    }

    public Group createGroup(Group group, Long roomId) {
        Optional<Room> room = roomRepository.findById(roomId);
        room.ifPresent(group::setRoom);
        return groupRepository.save(group);
    }
}
