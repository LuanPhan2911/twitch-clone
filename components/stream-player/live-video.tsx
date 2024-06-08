"use client";
import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FullScreenControl } from "./controls/fullscreen-control";
import { VolumeControl } from "./controls/volume-control";

type Props = {
  participant: Participant;
};
export const LiveVideo = ({ participant }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setFullScreen] = useState(false);
  const [volume, setVolume] = useState(0);
  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setFullScreen(false);
    } else if (wrapperRef?.current) {
      wrapperRef?.current?.requestFullscreen();
      setFullScreen(true);
    }
  };
  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };
  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);
    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };
  useEffect(() => {
    onVolumeChange(0);
  }, []);
  return (
    <div className="relative flex h-full" ref={wrapperRef}>
      <video width={"100%"} ref={videoRef}></video>
      <div
        className="absolute top-0 h-full 
      w-full opacity-0 hover:opacity-100 hover:transition-all"
      >
        <div
          className="absolute bottom-0 
        flex h-14 items-center justify-between bg-gradient-to-r from-neutral-900 px-4"
        >
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};
