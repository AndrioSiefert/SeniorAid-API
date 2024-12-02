import { FindOneOptions, Repository } from 'typeorm';
import FeedbackEntity from '../entities/FeedbackEntity';
import GenericRepository from './GenericRepository';

class FeedbackRepository extends GenericRepository<FeedbackEntity> {
    constructor(feedback: Repository<FeedbackEntity>) {
        super(feedback);
    }

    async getFeedbacks(): Promise<FeedbackEntity[]> {
        return await this.getAll();
    }

    async getFeedbackById(id: number): Promise<FeedbackEntity | undefined> {
        return await this.getById(id);
    }

    async createFeedback(feedback: FeedbackEntity): Promise<FeedbackEntity> {
        return await this.create(feedback);
    }

    async save(entity: FeedbackEntity): Promise<FeedbackEntity> {
        return this.repository.save(entity);
    }

    async getGiverAndReciver(id: number): Promise<FeedbackEntity | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ['giver', 'reciver'],
        });
    }

    async feedbackByGiver(id: number): Promise<FeedbackEntity[]> {
        return await this.repository.find({
            where: { giverId: id },
            relations: ['giver', 'receiver'], // Certifique-se de que 'receiver' seja usado
        });
    }
}

export default FeedbackRepository;
