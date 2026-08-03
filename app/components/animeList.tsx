import {AnimeItem} from "@/app/types/animeTypes"
import {AnimeCard} from "@/app/components/animeCard";

interface AnimeListProps {
    list: AnimeItem[];
}

export const AnimeList: React.FC<AnimeListProps> = ({list}) => {
    if (list.length === 0) {
        return (<p className={"text-gray mt-4"}>No anime found</p>)
    }

    return (
        <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-autoHW mt-5 text-center items-center content-center"}>
            {list.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
        </div>
    )
}