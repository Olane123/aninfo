export interface JikanAnime {
    mal_id: number;
    title: string;
    synopsis: string;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        }
    };
}

async function getAnimeByName(name: string): Promise<JikanAnime[] | undefined> {
    const encodedName = encodeURIComponent(name).toLowerCase();
    const url = `https://api.jikan.moe/v4/anime?q=${encodedName}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const result = await response.json();
        return result.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export {getAnimeByName};