import {Participant} from "@/api/interfaces/participant";

export interface Group {
    id: number;
    destination: string;
    transportationType: string;
    maxParticipants: number;
    participants: Participant[];
}