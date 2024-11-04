import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bus, Car, Plane, Train, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleGetRoomByCode } from "@/api/services/roomService";
import { Room } from "@/api/interfaces/room";
import { Group } from "@/api/interfaces/group";

const TransportIcon = ({ type }: { type: Group["transportationType"] }) => {
    switch (type) {
        case "bus":
            return <Bus className="w-6 h-6" />;
        case "car":
            return <Car className="w-6 h-6" />;
        case "plane":
            return <Plane className="w-6 h-6" />;
        case "train":
            return <Train className="w-6 h-6" />;
    }
};

const ExpandedCard = ({ group, onClose, onJoin }: { group: Group; onClose: () => void; onJoin: () => void }) => {
    const availableSlots = group.maxParticipants ? group.maxParticipants - group.participants.length : null;

    return (
        <div className="relative">
            <button
                onClick={onClose}
                className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700"
                aria-label="Close dialog"
            >
                <X className="w-6 h-6" />
            </button>
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                    {group.destination}
                    <TransportIcon type={group.transportationType} />
                </DialogTitle>
                <DialogDescription>
                    Transport: {group.transportationType.charAt(0).toUpperCase() + group.transportationType.slice(1)}
                </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
                {availableSlots !== null && (
                    <p className="text-lg font-semibold">
                        {availableSlots} / {group.maxParticipants} slots available
                    </p>
                )}
                <h3 className="text-xl font-semibold mt-6 mb-2">Participants:</h3>
                <ScrollArea className="h-[200px]">
                    <ul className="space-y-2">
                        {group.participants.map((participant, index) => (
                            <li key={index} className="text-sm">
                                {participant.name} - {participant.destination}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
                <Button onClick={onJoin} className="mt-4 w-full">Join Group</Button>
            </div>
        </div>
    );
};

const JoinForm = ({ onSubmit, onCancel }: { onSubmit: (name: string, destination: string) => void; onCancel: () => void }) => {
    const [name, setName] = useState("");
    const [destination, setDestination] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name, destination);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="destination">Your Destination</Label>
                <Input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                />
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Join</Button>
            </div>
        </form>
    );
};

export default function RoomPage() {
    const { code } = useParams<{ code: string }>();
    const [groups, setGroups] = useState<Group[]>([]);
    const [roomTitle, setRoomTitle] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        const fetchRoom = async () => {
            if (!code) return;
            try {
                const room: Room = await handleGetRoomByCode(code);
                setGroups(room.groups);
                setRoomTitle(room.title);
            } catch (error) {
                console.error("Failed to fetch room:", error);
            }
        };

        fetchRoom();
    }, [code]);

    const handleJoin = (name: string, destination: string) => {
        if (selectedGroup) {
            const updatedGroups = groups.map(group => {
                if (group.id === selectedGroup.id) {
                    return {
                        ...group,
                        participants: [...group.participants, { id: Date.now(), name, destination }]
                    };
                }
                return group;
            });
            setGroups(updatedGroups);
            setSelectedGroup(null);
            setIsJoining(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">{roomTitle}</h1>
                <p className="text-xl text-muted-foreground mb-1">Room Code: {code}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <Card key={group.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => setSelectedGroup(group)}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold">{group.destination}</CardTitle>
                            <TransportIcon type={group.transportationType} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground mb-4">
                                Transport: {group.transportationType.charAt(0).toUpperCase() + group.transportationType.slice(1)}
                            </div>
                            {group.maxParticipants && (
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">
                                        {group.maxParticipants - group.participants.length} / {group.maxParticipants}
                                    </span>
                                    <span className="text-sm text-muted-foreground">slots available</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={selectedGroup !== null} onOpenChange={(open) => !open && setSelectedGroup(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    {selectedGroup && (
                        <ExpandedCard
                            group={selectedGroup}
                            onClose={() => setSelectedGroup(null)}
                            onJoin={() => setIsJoining(true)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isJoining} onOpenChange={(open) => !open && setIsJoining(false)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Join Group</DialogTitle>
                        <DialogDescription>
                            Enter your details to join the group
                        </DialogDescription>
                    </DialogHeader>
                    <JoinForm
                        onSubmit={handleJoin}
                        onCancel={() => setIsJoining(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}