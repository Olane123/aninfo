import {AnimeItem} from "@/app/types/animeTypes";

interface AnimeCardProps {
    anime: AnimeItem;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({anime}) => {
    return (
        <div className={"bg-[#343942] rounded-lg overflow-hidden shadow-lg p-4 flex flex-col items-center"}>
            {anime.images?.jpg?.image_url && (
                <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className={"w-full h-64 object-cover rounded"}
                />
            )}
            <h3 className={"text-lg font-bold mt-3 line-clamp-1"}>{anime.title}</h3>
            <p className={"text-sm text-gray-400 mt-2 line-clamp-3 text-left"}>{anime.synopsis}</p>
        </div>
    )
}