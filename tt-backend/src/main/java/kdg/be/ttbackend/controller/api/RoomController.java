package kdg.be.ttbackend.controller.api;

import kdg.be.ttbackend.controller.dto.in.RoomCreateDTO;
import kdg.be.ttbackend.controller.dto.out.RoomDTO;
import kdg.be.ttbackend.domain.Room;
import kdg.be.ttbackend.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody RoomCreateDTO roomCreateDTO) {
        Room room = convertToRoom(roomCreateDTO);
        return ResponseEntity.ok(roomService.createRoom(room));
    }

    @GetMapping("/{code}")
    public ResponseEntity<Room> getRoomByCode(@PathVariable String code) {
        return roomService.findByCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private Room convertToRoom(RoomCreateDTO roomCreateDTO) {
        return new Room(
                roomCreateDTO.getTitle(),
                roomCreateDTO.getDate()
        );
    }
}