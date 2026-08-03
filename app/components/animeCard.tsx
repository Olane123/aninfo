import {ShikimoriAnime} from "@/app/api/animeList/animeList";

interface AnimeCardProps {
    anime: ShikimoriAnime;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({anime}) => {
    return (
        <div className={"bg-[#343942] rounded-lg overflow-hidden shadow-lg p-4 flex flex-col items-center"}>
            {anime.image?.original && (
                <img
                    src={anime.image?.original}
                    alt={anime.russian}
                    className={"w-full h-64 object-cover rounded"}
                />
            )}
            <h3 className={"text-lg font-bold mt-3 line-clamp-1"}>{anime.description}</h3>
            <p className={"text-sm text-gray-400 mt-2 line-clamp-3 text-left"}>{anime.description}</p>
        </div>
    )
}