import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, SkipForward, SkipBack, Heart, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const romanticPlaylist = [
    { 
      title: "Soft Piano Romance", 
      artist: "Romantic Instrumental",
      // Using royalty-free romantic music
      url: "https://www.soundjay.com/misc/sounds/wind-chime-02.wav"
    },
    { 
      title: "Gentle Love Melody", 
      artist: "Piano & Strings",
      url: "https://www.soundjay.com/misc/sounds/wind-chime-02.wav"
    },
    { 
      title: "Dreamy Serenade", 
      artist: "Soft Instrumental",
      url: "https://www.soundjay.com/misc/sounds/wind-chime-02.wav"
    },
    { 
      title: "Romantic Evening", 
      artist: "Classical Guitar",
      url: "https://www.soundjay.com/misc/sounds/wind-chime-02.wav"
    },
    { 
      title: "Love's Whisper", 
      artist: "Ambient Romance",
      url: "https://www.soundjay.com/misc/sounds/wind-chime-02.wav"
    },
    { 
      title: "Tender Hearts", 
      artist: "Orchestral Love",
      url: "https://www.soundjay.com/misc/sounds/wind-chime-02.wav"
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % romanticPlaylist.length);
    setCurrentTime(0);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + romanticPlaylist.length) % romanticPlaylist.length);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={romanticPlaylist[currentSong].url}
        onLoadStart={() => setCurrentTime(0)}
      />
      
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="romantic-card rounded-2xl p-4 shadow-2xl max-w-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <Heart size={16} className="romantic-pink animate-heartbeat" />
            <span className="text-xs romantic-purple font-medium">Romantic Playlist</span>
            <button onClick={toggleMute} className="text-gray-400 hover:text-gray-600">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
          
          <div className="text-center mb-3">
            <div className="font-medium romantic-brown text-sm truncate">
              {romanticPlaylist[currentSong].title}
            </div>
            <div className="text-gray-500 text-xs truncate">
              {romanticPlaylist[currentSong].artist}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-3">
            <button
              onClick={prevSong}
              className="romantic-purple hover:text-pink-600 transition-colors"
            >
              <SkipBack size={16} />
            </button>
            
            <button
              onClick={togglePlay}
              className="romantic-pink hover:text-purple-600 transition-colors bg-white rounded-full p-2 shadow-md"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <button
              onClick={nextSong}
              className="romantic-purple hover:text-pink-600 transition-colors"
            >
              <SkipForward size={16} />
            </button>
          </div>
          
          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <VolumeX size={12} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <Volume2 size={12} className="text-gray-400" />
          </div>
          
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500">
              🎵 Experience our love story with music
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
