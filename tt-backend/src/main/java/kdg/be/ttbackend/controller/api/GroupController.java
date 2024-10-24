package kdg.be.ttbackend.controller.api;

import kdg.be.ttbackend.controller.dto.in.GroupCreateDTO;
import kdg.be.ttbackend.controller.dto.out.GroupDTO;
import kdg.be.ttbackend.domain.Group;
import kdg.be.ttbackend.domain.TransportType;
import kdg.be.ttbackend.service.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping("/room/{roomId}")
    public ResponseEntity<Group> createGroup(@RequestBody GroupCreateDTO groupCreateDTO, @PathVariable Long roomId) {
        Group group = convertToGroup(groupCreateDTO);
        return ResponseEntity.ok(groupService.createGroup(group, roomId));
    }

    private Group convertToGroup(GroupCreateDTO groupCreateDTO) {
        TransportType transportType = TransportType.valueOf(groupCreateDTO.getTransportType().toUpperCase());
        return new Group(
                groupCreateDTO.getDestination(),
                transportType,
                groupCreateDTO.getMaxParticipants()
        );
    }
}
