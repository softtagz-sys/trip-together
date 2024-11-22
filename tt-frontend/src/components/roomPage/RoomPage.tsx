import React, { useEffect, useState } from 'react';
import { getRoomByCode } from '@/api/services/roomService';
import { createGroup } from '@/api/services/groupService';
import { Room } from '@/api/interfaces/room';
import { Group } from '@/api/interfaces/group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TransportIcon from '@/components/roomPage/TransportIcon';
import GroupCard from '@/components/roomPage/GroupCard';
import JoinGroupForm from '@/components/roomPage/JoinGroupForm';
import CreateGroupForm from '@/components/roomPage/CreateGroupForm';

const RoomPage = ({ code }: { code: string }) => {
    const [room, setRoom] = useState<Room | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [isJoining, setIsJoining] = useState(false);
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);

    useEffect(() => {
        const fetchRoom = async () => {
            if (!code) return;
            try {
                const room: Room = await getRoomByCode(code);
                setRoom(room);
                setGroups(room.groups);
            } catch (error) {
                console.error("Failed to fetch room:", error);
            }
        };

        fetchRoom();
    }, [code]);

    const handleJoin = (name: string, destination: string) => {
        if (!selectedGroup) return;
        const updatedGroup = {
            ...selectedGroup,
            participants: [
                ...selectedGroup.participants,
                { id: selectedGroup.participants.length + 1, name, destination }
            ]
        };
        setGroups(groups.map(group => group.id === selectedGroup.id ? updatedGroup : group));
        setIsJoining(false);
    };

    const handleCreateGroup = async (newGroup: Omit<Group, 'id' | 'participants'>) => {
        if (!room) return;
        try {
            const createdGroup = await createGroup(room.id, newGroup.destination, newGroup.transportationType, newGroup.maxParticipants);
            setGroups([...groups, createdGroup]);
            setIsCreatingGroup(false);
        } catch (error) {
            console.error("Failed to create group:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-2">{room?.title}</h1>
                <p className="text-xl text-muted-foreground mb-1">Room Code: {code}</p>
            </header>

            <div className="mb-6 flex justify-center">
                <Button onClick={() => setIsCreatingGroup(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Group
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <Card key={group.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                          onClick={() => setSelectedGroup(group)}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl font-bold">{group.destination}</CardTitle>
                            <TransportIcon type={group.transportationType} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground mb-4">
                                Transport: {group.transportationType}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">
                                    {group.participants.length} / {group.maxParticipants} slots available
                                </span>
                                <span className="text-sm text-muted-foreground">slots available</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={selectedGroup !== null} onOpenChange={(open) => !open && setSelectedGroup(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    {selectedGroup && (
                        <GroupCard
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
                    <JoinGroupForm
                        onSubmit={handleJoin}
                        onCancel={() => setIsJoining(false)}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={isCreatingGroup} onOpenChange={(open) => !open && setIsCreatingGroup(false)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Group</DialogTitle>
                        <DialogDescription>
                            Enter the details for the new group
                        </DialogDescription>
                    </DialogHeader>
                    <CreateGroupForm
                        onSubmit={handleCreateGroup}
                        onCancel={() => setIsCreatingGroup(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default RoomPage;