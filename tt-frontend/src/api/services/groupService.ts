import {BASE_URL} from "@/config";

export const createGroup = async (roomId: number, destination: string, transportType: string, maxParticipants: number | null) => {
    const response = await fetch(`${BASE_URL}/api/groups/create/${roomId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination, transportType, maxParticipants }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create group: ${response.statusText}`);
    }

    return response.json();
}