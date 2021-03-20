export interface Movie {
    id: string;
    title: string;
    plot?: string;
    budget?: number;
    gross?: number;
    runTimeInMinutes?: number;
    rating?: number;
    ratingCount?: number;
    releaseDate?: Date;
    countries?: string[];
    languages?: string[];
    genres?: string[];
    directors?: string[];
    writers?: string[];
    posterUrl?: string;
    actors?: {
        name: string;
        characters?: string[];
    }
}
