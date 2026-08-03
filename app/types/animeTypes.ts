export interface AnimeItem {
    mal_id: number;
    title: string;
    synopsis: string;
    images?: {
        jpg?: {
            image_url?: string;
        }
    };
}