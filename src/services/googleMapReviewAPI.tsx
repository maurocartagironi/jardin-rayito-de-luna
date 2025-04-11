const GOOGLE_API_KEY = 'AIzaSyCYC_tBUDxy9GvzMBqRBVeAerX_wR6wkcs';

type Review = {
    author_name: string;
    rating: number;
    text: string;
};

export type RatingAndReview = {
    rating: number | null;
    reviews: Review[];
};

export const fetchPlaceDetails = async (): Promise<RatingAndReview> => {
    const ratingAndReview: RatingAndReview = {
        rating: null,
        reviews: [],
    };

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJ9RuryXGZvJURYAMCnAVgCoY&fields=rating,reviews,user_ratings_total&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        if (data.result) {
            ratingAndReview.reviews = data.result.reviews || [];
            ratingAndReview.rating = data.result.rating || null;
        }
    } catch (error) {
        console.error('Error fetching place details:', error);
    }

    return ratingAndReview;
};
