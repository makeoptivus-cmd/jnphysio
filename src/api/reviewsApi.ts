import { supabase } from "@/lib/supabaseClient";

export interface Review {
    id?: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

export interface PostReviewResponse {
    success: boolean;
    data?: Review[];
    error?: string;
}

/**
 * POST method to create a new review in Supabase
 * @param review - Review object containing name, rating, comment, date
 * @returns Promise with success status and data/error
 */
export const postReview = async (review: Review): Promise<PostReviewResponse> => {
    try {
        const { data, error } = await supabase
            .from("reviews")
            .insert([review])
            .select();

        if (error) {
            console.error("Supabase POST Error:", error.message);
            return {
                success: false,
                error: error.message,
            };
        }

        console.log("Review posted successfully:", data);
        return {
            success: true,
            data,
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("POST Review Error:", errorMessage);
        return {
            success: false,
            error: errorMessage,
        };
    }
};

/**
 * GET method to fetch all reviews from Supabase
 * @returns Promise with reviews data and error status
 */
export const fetchReviews = async (): Promise<{ data: Review[]; error: string | null }> => {
    try {
        const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .order("date", { ascending: false });

        if (error) {
            console.error("Supabase GET Error:", error.message);
            return {
                data: [],
                error: error.message,
            };
        }

        console.log("Reviews fetched successfully:", data);
        return {
            data: data || [],
            error: null,
        };
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("GET Reviews Error:", errorMessage);
        return {
            data: [],
            error: errorMessage,
        };
    }
};
