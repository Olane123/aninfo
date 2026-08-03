import {JikanAnime} from "@/app/api/animeList/animeList";

interface AnimeListProps {
    list: JikanAnime[];
}

export const AnimeList: React.FC<AnimeListProps> = ({list}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {list.map((anime) => (
                <div key={anime.mal_id} className="bg-[#242830] rounded-lg overflow-hidden shadow-lg p-4 flex flex-col items-center">
                    {anime.images?.jpg?.large_image_url && (
                        <img
                            src={anime.images.jpg.large_image_url}
                            alt={anime.title}
                            className="w-full h-72 object-cover rounded shadow"
                            loading="lazy"
                        />
                    )}
                    <h3 className="text-lg font-bold mt-4 line-clamp-2 min-h-14 flex items-center text-center">
                        {anime.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-4 text-left w-full">
                        {anime.synopsis || "No description available."}
                    </p>
                </div>
            ))}
        </div>
    )
}