"use client"

import {getAnimeByName, JikanAnime} from "@/app/api/animeList/animeList";
import {useState} from "react";
import {AnimeList} from "@/app/components/animeList";

export default function Home() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [animeList, setAnimeList] = useState<JikanAnime[]>([]);

    const findAnimeByName = async () => {
        if (loading || name.length === 0) return;

        setLoading(true);

        try{
            const data = await getAnimeByName(name);
            if (data)
            {
                setAnimeList(data);
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
                <input type={"text"} className={"text-center p-2"} placeholder={"Enter anime name..."} onKeyDown={(e) => e.key === "Enter" && findAnimeByName()} onChange={(e) => setName(e.target.value)}></input>
                <input type={"button"} className={"text-center p-2"} value={loading ? "Searching" : "Submit"} onClick={findAnimeByName} disabled={loading}></input>
            </div>
            <AnimeList list={animeList}/>
        </>
    );
}
