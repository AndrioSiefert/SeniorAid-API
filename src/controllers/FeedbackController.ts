import FeedbackRepository from '../repository/FeedbackRepository';
import Controllers from './Controllers';

class FeedbackController extends Controllers<FeedbackRepository> {
    constructor(feedback: FeedbackRepository) {
        super(feedback);
    }
}

export default FeedbackController;
