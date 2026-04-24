import { useRef, useState, useEffect } from "react";
import { useSong } from "../hooks/useSong";
import "../styles/Player.scss";

const Player = () => {
  const { song, loading } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Handle play/pause
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle forward skip (10 seconds)
  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration
      );
    }
  };

  // Handle backward skip (10 seconds)
  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
  };

  // Handle speed change
  const handleSpeedChange = () => {
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setPlaybackRate(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Update current time as audio plays
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Update duration when metadata is loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle song end
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Format time to MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  if (loading) {
    return (
      <div className="player-bar">
        <div className="player-content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="player-bar">
      <audio
        ref={audioRef}
        src={song?.songUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="player-content">
        {/* Song Poster - Small Thumbnail */}
        <div className="player-poster-small">
          <img src={song?.posterUrl} alt={song?.title} />
          <div className={`play-indicator-small ${isPlaying ? "playing" : ""}`}>
            {isPlaying ? "▶" : "⏸"}
          </div>
        </div>

        {/* Song Info */}
        <div className="player-song-info">
          <h3 className="player-song-title">{song?.title}</h3>
          <p className="player-song-mood">{song?.mood}</p>
        </div>

        {/* Progress Bar */}
        <div className="player-progress-container">
          <span className="time-small">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="player-progress-bar"
          />
          <span className="time-small">{formatTime(duration)}</span>
        </div>

        {/* Control Buttons */}
        <div className="player-controls">
          <button
            className="player-control-btn player-speed-btn"
            onClick={handleSpeedChange}
            title="Change playback speed"
          >
            <span className="player-speed-value">{playbackRate}x</span>
          </button>

          <button
            className="player-control-btn player-backward-btn"
            onClick={handleBackward}
            title="Backward 10 seconds"
          >
            ⏪
          </button>

          <button
            className="player-control-btn player-play-btn"
            onClick={handlePlayPause}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            className="player-control-btn player-forward-btn"
            onClick={handleForward}
            title="Forward 10 seconds"
          >
            ⏩
          </button>

          <div className="player-volume-control">
            <span className="player-volume-icon">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="player-volume-slider"
              title="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
