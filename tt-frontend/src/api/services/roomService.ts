import { createRoom, joinRoom } from '@/api/controllers/roomController';

export const handleRoomCreation = async (title: string, date: Date) => {
    try {
        const room = await createRoom(title, date);
        return room;
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
};

export const JoinRoom = async (roomCode: string) => {
    try {
        const room = await joinRoom(roomCode);
        return room;
    } catch (error) {
        console.error("Error joining room:", error);
        throw error;
    }
};