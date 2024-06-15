"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useDebounceValue } from "usehooks-ts";

type Props = {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
};
export const ChatCommunity = ({ hostName, isHidden, viewerName }: Props) => {
  const participants = useParticipants();
  const [value, setValue] = useState<string>("");
  const [debounceValue, setDebounceValue] = useDebounceValue(value, 500);

  const onChange = (newValue: string) => {
    setValue(newValue);
    setDebounceValue(newValue);
  };
  console.log(participants);

  const filteredParticipants = useMemo(() => {
    const deduplicated = participants.reduce((acc, participant) => {
      const hostAsViewer = `host:${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduplicated.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debounceValue.toLowerCase());
    });
  }, [participants, debounceValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground font-semibold">
          Community is disabled
        </p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea>
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filteredParticipants.map((participant) => {
          return (
            <CommunityItem
              key={participant.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantIdentity={participant.identity}
              participantName={participant.name}
            />
          );
        })}
      </ScrollArea>
    </div>
  );
};
