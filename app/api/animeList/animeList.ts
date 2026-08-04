"use server";

export interface ShikimoriAnime {
    id: number;
    name: string;
    russian: string;
    description: string;
    score: number;

    episodes: number;
    aired_on: string

    rating: string;

    image: {
        original: string;
        preview: string;
        x96: string;
        x48: string;
    };
}
const USER_AGENT="AnInfo/1.0.0"
const SHIKIMORI_CDN = "https://shikimori.io";

const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400">' +
    '<rect fill="%23242830" width="300" height="400"/>' +
    '<text fill="%23666" font-family="sans-serif" font-size="16" x="50%" y="50%" text-anchor="middle" dy=".3em">No Image</text>' +
    '</svg>'
)}`;

async function getAnimeByName(name: string): Promise<ShikimoriAnime[]> {
    const encodedName = encodeURIComponent(name).toLowerCase();

    const url = `https://shikimori.one/api/animes?search=${encodedName}&limit=5`;

    const headers = {
        "User-Agent": USER_AGENT,
        "Accept": "application/json",
    };

    try {
        const response = await fetch(url, { headers, cache: "no-store" });

        if (!response.ok) throw new Error(`Search failed: ${response.statusText}`);

        const shortList = await response.json();
        if (!Array.isArray(shortList) || shortList.length === 0) return [];

        const detailedAnimes: ShikimoriAnime[] = [];

        for (const anime of shortList) {
            const detailUrl = `https://shikimori.one/api/animes/${anime.id}`;
            const detailedResponse = await fetch(detailUrl, { headers, cache: "no-store" });

            if (detailedResponse.ok) {
                const fullData = await detailedResponse.json();
                const sanitizedImages = {
                    original: FALLBACK_IMAGE,
                    preview: FALLBACK_IMAGE,
                    x96: FALLBACK_IMAGE,
                    x48: FALLBACK_IMAGE,
                };

                if (fullData.image) {
                    const keys = ["original", "preview", "x96", "x48"] as const;
                    for (const key of keys) {
                        const imgUrl = fullData.image[key];
                        if (typeof imgUrl === "string" && imgUrl.trim() !== "") {
                            sanitizedImages[key] = imgUrl.startsWith("http")
                                ? imgUrl
                                : `https://shikimori.io${imgUrl}`;
                        }
                    }
                }
                fullData.image = sanitizedImages;

                fullData.russian = fullData.russian || fullData.name;
                fullData.description = fullData.description || "Описание не найденно.";
                fullData.score = fullData.score || "Информация о рейтинге не найдена.";
                fullData.episodes = fullData.episodes || "Информация о эпизодах не найдена.";
                fullData.rating = fullData.rating || "Информация о возврастном рейтинге не найдена.";

                detailedAnimes.push(fullData);
            }
            await new Promise((resolve) => setTimeout(resolve, 200));
        }

        return detailedAnimes;
    } catch (error) {
        console.error("getAnimeByName error:", error);
        throw error;
    }
}

export { getAnimeByName };