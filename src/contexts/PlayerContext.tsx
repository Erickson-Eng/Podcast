import { createContext, useState, ReactNode } from 'react';


type Episode = {
    title: string;
    members: string
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    function play(episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);

    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);

    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex >= 0;
    const hasNext = (currentEpisodeIndex + 1) <= episodeList.length;

    function playNext() {
        const nextEpisodeIndex = currentEpisodeIndex + 1;
        if (hasNext) {
            setCurrentEpisodeIndex(nextEpisodeIndex)
        }
    }
    function playPrevious() {
        const nextEpisodeIndex = currentEpisodeIndex - 1;
        if (hasPrevious) {
            setCurrentEpisodeIndex(nextEpisodeIndex)
        }
    }

    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            playList,
            playNext,
            playPrevious,
            isPlaying,
            togglePlay,
            setPlayingState,
            hasNext,
            hasPrevious
        }}>
            {children}
        </PlayerContext.Provider>
    )
}