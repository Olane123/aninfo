"use client"

import {getAnimeByName, ShikimoriAnime} from "@/app/api/animeList/animeList";
import {useState} from "react";
import {AnimeList} from "@/app/components/animeList";

export default function Home() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [animeList, setAnimeList] = useState<ShikimoriAnime[]>([]);

    const findAnimeByName = async () => {
        if (loading || name.length === 0) return;

        setLoading(true);

        try{
            const data = await getAnimeByName(name);
            if (data)
            {
                setAnimeList(data);
                console.log(data);
            }
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className={"bg-[#343942] flex flex-col m-0-auto text-center content-center items-center"}>
                <input type={"text"} className={"text-center p-2  border-2 rounded-[15px] bg-[#1c1f24] border-[#1c1f24] m-2 transition-all focus::outline-2 focus:outline-amber-500 hover:scale-110"} placeholder={"Введите название аниме.."} onKeyDown={(e) => e.key === "Enter" && findAnimeByName()} onChange={(e) => setName(e.target.value)}></input>
                <input type={"button"} className={"text-center p-2 border-2 rounded-[15px]  bg-[#1c1f24] border-[#1c1f24] m-2 transition-all hover:outline-2 hover:outline-amber-500 hover:scale-110"} value={loading ? "Поиск..." : "Подтвердить"} onClick={findAnimeByName} disabled={loading}></input>
            </div>
            {loading ? (
                <p className={"text-xl text-gray text-center"}>Загрузка...</p>
            ) : (
                <AnimeList list={animeList}/>
            )}
        </>
    );
}
