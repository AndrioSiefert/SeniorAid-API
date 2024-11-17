import FeedbackEntity from '../entities/FeedbackEntity';

/**
 * Função para calcular a média de ratings de feedbacks.
 * @param previousFeedbacks - Lista de feedbacks anteriores.
 * @param newRating - Novo rating a ser incluído na média.
 * @returns A nova média.
 */

export const calculateAverageRating = (previousFeedbacks: FeedbackEntity[], newRating: number): number => {
    if (previousFeedbacks.length === 0) {
        return newRating;
    }

    const totalRatings = previousFeedbacks.reduce((acc, fb) => acc + fb.rating, 0);
    return (totalRatings + newRating) / (previousFeedbacks.length + 1);
};
