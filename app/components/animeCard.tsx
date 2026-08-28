import {ShikimoriAnime} from "@/app/api/animeList/animeList";
import Image from "next/image";

interface AnimeCardProps {
    anime: ShikimoriAnime;
}

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23242830'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' font-family='sans-serif' font-size='16' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

export const AnimeCard: React.FC<AnimeCardProps> = ({anime}) => {
    const animeImagePicture = anime.image?.original || anime.image?.preview || FALLBACK_IMG;
    const title = anime.russian || anime.name || undefined

    const cleanDescription = anime.description
        ? anime.description.replace(/\[.*?\]/g, "")
        : "Описание отсутствует.";

    return (
        <div className={"bg-[#343942] rounded-lg overflow-hidden shadow-lg p-4 flex flex-col items-center"}>
            {anime.image?.original && (
                <Image
                    src={animeImagePicture}
                    alt={anime.russian}
                    className={"w-full h-64 object-cover rounded"}
                    loading="lazy"
                    referrerPolicy={"no-referrer"}
                    width={256}
                    height={384}
                    unoptimized
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== FALLBACK_IMG) {
                            target.src = FALLBACK_IMG;
                      }
                    }}
                />
            )}

            <h3 className={"text-lg font-bold mt-3 line-clamp-1 text-center w-full"}>{title}</h3>
            <p className={"text-sm text-gray-400 mt-2 line-clamp-3 text-left"}>{cleanDescription}</p>
        </div>
    )
}
