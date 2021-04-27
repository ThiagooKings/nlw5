import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    isShuffling: boolean;

    play: (episode: Episode) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
};

type PlayerContextProviderProps = {
    children: ReactNode;
}


export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0);
    const [isPlaying, setisPlaying] = useState(false);
    const [isLooping, setisLooping] = useState(false);
    const [isShuffling, setisShuffling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode])
        setcurrentEpisodeIndex(0);
        setisPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setcurrentEpisodeIndex(index);
        setisPlaying(true);

    }

    function toggleLoop(){
        setisLooping(!isLooping);
    }

    function togglePlay() {
        setisPlaying(!isPlaying);
    }

    function toggleShuffle() {
        setisShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean) {
        setisPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

    function playNext() {
        if (isShuffling){
            const nextRamdomEpisodeIndex = Math.floor(Math.random()* episodeList.length);
            setcurrentEpisodeIndex(nextRamdomEpisodeIndex);
        }else if (hasNext) {
            setcurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setcurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setcurrentEpisodeIndex(0);
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                isPlaying,
                isLooping,
                isShuffling,
                toggleLoop,
                play, 
                playNext,
                playPrevious,
                togglePlay,
                setPlayingState,
                playList,
                toggleShuffle,
                hasNext,
                hasPrevious,
                clearPlayerState,
            }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}
