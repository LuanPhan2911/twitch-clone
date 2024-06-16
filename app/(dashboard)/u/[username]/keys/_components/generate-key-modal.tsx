"use client";
import { createIngress } from "@/actions/ingress";
import { CommonModal } from "@/components/modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/stores/use-modal";
import { IngressInput } from "livekit-server-sdk";

import { AlertTriangle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {};
const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;
export const GenerateKeyModal = ({}: Props) => {
  const [ingress, setIngress] = useState<IngressType>(RTMP);
  const [isSpending, startTransition] = useTransition();
  const { isOpen, type, onClose } = useModal();
  const isOpenModal = isOpen && type === "create-ingress";

  const onCreateIngress = () => {
    startTransition(() => {
      createIngress(parseInt(ingress))
        .then(() => {
          toast.success("Ingress created");
          onClose();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <CommonModal isOpen={isOpenModal} title={"Generate Connection"}>
      <Select
        value={ingress}
        onValueChange={(value) => setIngress(value)}
        disabled={isSpending}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ingress Type"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={RTMP}>RTMP</SelectItem>
          <SelectItem value={WHIP}>WHIP</SelectItem>
        </SelectContent>
      </Select>
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action will reset active streams using current connection!
        </AlertDescription>
      </Alert>
      <div className="flex items-center justify-between">
        <Button
          variant={"ghost"}
          size={"sm"}
          disabled={isSpending}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant={"primary"}
          size={"sm"}
          disabled={isSpending}
          onClick={onCreateIngress}
        >
          Generate
        </Button>
      </div>
    </CommonModal>
  );
};
export const GenerateKeyButton = () => {
  const { onOpen } = useModal();
  return (
    <Button variant={"primary"} onClick={() => onOpen("create-ingress")}>
      Generate Connection
    </Button>
  );
};
