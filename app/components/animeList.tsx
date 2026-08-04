"use client";
import {useEffect, useState} from "react";
import type { ShikimoriAnime } from "@/app/api/animeList/animeList";
import { AnimeCard } from "@/app/components/animeCard";
import Image from "next/image";

interface AnimeListProps {
    list: ShikimoriAnime[];
}

const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://w3.org' width='300' height='400'%3E%3Crect width='300' height='400' fill='%23242830'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' font-family='sans-serif' font-size='16' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

export const AnimeList: React.FC<AnimeListProps> = ({ list }) => {
    const [selectedAnime, setSelectedAnime] = useState<ShikimoriAnime | null>(null);

    useEffect(() => {
        if (selectedAnime !== null) {
            document.body.style.overflow = "hidden";
        }
        else{
            document.body.style.overflow = "auto";
        }
    })

    return (
        <div className={`max-w-6xl mx-auto mt-3 px-4`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {list.map((anime) => (
                    <div
                        key={anime.id}
                        onClick={() => setSelectedAnime(anime)}
                        className="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                    >
                        <AnimeCard anime={anime} />
                    </div>
                ))}
            </div>

            {selectedAnime && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={() => setSelectedAnime(null)}
                >
                    <div
                        className="bg-[#242830] text-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row p-6 relative border border-gray-700/50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors custom-close-btn cursor-pointer"
                            onClick={() => setSelectedAnime(null)}
                        >
                            &times;
                        </button>


                        <div className="shrink-0 w-full md:w-48 mb-4 md:mb-0">
                            <Image
                                src={selectedAnime.image?.original || selectedAnime.image?.preview || FALLBACK_IMG}
                                alt={selectedAnime.russian || selectedAnime.name}
                                width={256}
                                height={384}
                                unoptimized
                                referrerPolicy={"no-referrer"}
                                className="w-full h-auto object-cover rounded-lg shadow-md bg-[#1a1d24]"
                            />
                        </div>

                        <div className="md:ml-6 flex flex-col justify-start grow">
                            <h2 className="text-2xl font-bold text-gray-100 pr-6">
                                {selectedAnime.russian || selectedAnime.name}
                            </h2>

                            {selectedAnime.name && selectedAnime.russian && (
                                <>
                                    <p className="text-sm text-gray-400 mt-1 italic">{selectedAnime.name}</p>
                                    <p className={"text-sm text-gray-400 mt-1 italic"}>Выпущен/Выйдет: {selectedAnime.aired_on}</p>
                                    <p className={"text-sm text-gray-400 mt-1 italic"}>Эпизодов: {selectedAnime.episodes}</p>
                                    <p className={"text-sm text-gray-400 mt-1 italic"}>Рейтинг: {selectedAnime.rating.toUpperCase()}</p>

                                    <Image src={selectedAnime.studios.image} alt={selectedAnime.studios.filtered_name}></Image>
                                </>
                            )}
                            <div className={"mt-5"}>
                                <h2>Рейтинг</h2>
                                {selectedAnime.score}
                            </div>


                            <div className="h-px bg-gray-700 my-4" />

                            <p className="text-sm leading-relaxed text-gray-300 overflow-y-auto max-h-[40vh] pr-2">
                                {selectedAnime.description
                                    ? selectedAnime.description.replace(/\[.*?\]/g, "")
                                    : "Описание отсутствует."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
