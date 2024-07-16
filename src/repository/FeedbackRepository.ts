import { Repository } from 'typeorm';
import FeedbackEntity from '../entities/FeedbackEntity';
import GenericRepository from './GenericRepository';

class FeedbackRepository extends GenericRepository<FeedbackEntity> {
    constructor(feedback: Repository<FeedbackEntity>) {
        super(feedback);
    }
}

export default FeedbackRepository;
