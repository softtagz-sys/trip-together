import React from 'react';
import {Group} from '@/api/interfaces/group';
import {DialogHeader, DialogTitle, DialogDescription} from '@/components/ui/dialog';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Button} from '@/components/ui/button';
import TransportIcon from './TransportIcon';

const GroupCard = ({group, onJoin}: { group: Group; onClose: () => void; onJoin: () => void }) => (
    <div className="relative">
        <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                {group.destination}
                <TransportIcon type={group.transportType}/>
            </DialogTitle>
            <DialogDescription>
                Transport: {group.transportType.toLowerCase()}
            </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
            {group.maxParticipants !== null ? (
                <p className="text-lg font-semibold">
                    {group.participants.length} / {group.maxParticipants} commuters joined
                </p>
            ) : (
                <p className="text-lg font-semibold">
                    {group.participants.length} commuters joined
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

export default GroupCard;