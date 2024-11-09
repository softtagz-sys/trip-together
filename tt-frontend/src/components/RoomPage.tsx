import React, { useEffect, useState } from 'react';
import { handleGetRoomByCode } from '@/api/services/roomService';
import { Room } from '@/api/interfaces/room';

const RoomPage = ({ code }: { code: string }) => {
    const [roomTitle, setRoomTitle] = useState<string>("");

    useEffect(() => {
        const fetchRoom = async () => {
            if (!code) return;
            try {
                const room: Room = await handleGetRoomByCode(code);
                setRoomTitle(room.title);
            } catch (error) {
                console.error("Failed to fetch room:", error);
            }
        };

        fetchRoom()
    }, [code]);

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">{roomTitle}</h1>
                <p className="text-xl text-muted-foreground mb-1">Room Code: {code}</p>
            </header>
        </div>
    );
};

export default RoomPage;