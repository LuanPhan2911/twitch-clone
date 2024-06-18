import { GenerateKeyModal } from "@/app/(dashboard)/u/[username]/keys/_components/generate-key-modal";
import { InfoModal } from "../stream-player/info-modal";
import { BioModal } from "../stream-player/bio-modal";

export const ModalProvider = () => {
  return (
    <>
      <GenerateKeyModal />
      <InfoModal />
      <BioModal />
    </>
  );
};
