"use client";

import type { ShikimoriAnime } from "@/app/api/animeList/animeList";
import {AnimeCard} from "@/app/components/animeCard";

interface AnimeListProps {
    list: ShikimoriAnime[];
}

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23242830'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' font-family='sans-serif' font-size='16' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

export const AnimeList: React.FC<AnimeListProps> = ({ list }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-3">
            {list.map((anime) => {
                const imgSrc = anime.image?.preview || anime.image?.original || FALLBACK_IMG;
                return (
                    <div key={anime.id} className="bg-[#242830] rounded-lg overflow-hidden shadow-lg p-4 flex flex-col items-center">
                        <img
                            src={imgSrc}
                            alt={anime.russian || anime.name}
                            className="w-full h-72 object-cover rounded shadow bg-[#1a1d24]"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== FALLBACK_IMG) {
                                    target.src = FALLBACK_IMG;
                                }
                            }}
                        />

                        <h3 className="text-lg font-bold mt-4 line-clamp-2 min-h-14 flex items-center text-center">
                            {anime.russian || anime.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-4 text-left w-full">
                            {anime.description ? anime.description.replace(/\[.*?\]/g, "") : "Описание отсутствует."}
                        </p>

                    </div>
                );
            })}
        </div>
    );
};