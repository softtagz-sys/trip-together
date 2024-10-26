import { BASE_URL } from '@/config';

export const createRoom = async (title: string, date: Date) => {
    const response = await fetch(`${BASE_URL}/api/rooms/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, date: date.toISOString() }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create room: ${response.statusText}`);
    }

    return response.json();
};

export const joinRoom = async (roomCode: string) => {
    const response = await fetch(`${BASE_URL}/api/rooms/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomCode }),
    });

    if (!response.ok) {
        throw new Error(`Failed to join room: ${response.statusText}`);
    }

    return response.json();
};