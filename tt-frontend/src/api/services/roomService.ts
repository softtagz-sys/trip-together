import {createRoom, getRoomByCode} from '@/api/controllers/roomController';


export const handleRoomCreation = async (title: string, date: Date) => {
    try {
        return await createRoom(title, date);
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
};

export const handleGetRoomByCode = async (code: string): Promise<Room> => {
    try {
        return await getRoomByCode(code);
    } catch (error) {
        console.error("Error fetching room:", error);
        throw error;
    }
};