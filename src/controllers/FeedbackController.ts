import { Request, Response } from 'express';
import FeedbackRepository from '../repository/FeedbackRepository';
import Controllers from './Controllers';
import FeedbackEntity from '../entities/FeedbackEntity';
import SeniorRepository from '../repository/SeniorRepository';
import CaregiverRepository from '../repository/CaregiverRepository';

class FeedbackController extends Controllers<FeedbackRepository> {
    private seniorRepository: SeniorRepository;
    private caregiverRepository: CaregiverRepository;

    constructor(
        feedback: FeedbackRepository,
        seniorRepository: SeniorRepository,
        caregiverRepository: CaregiverRepository,
    ) {
        super(feedback);
        this.seniorRepository = seniorRepository;
        this.caregiverRepository = caregiverRepository;
    }

    create = async (req: Request, res: Response): Promise<void> => {
        const { giverId, receiverId, comment, rating } = <FeedbackEntity>(
            req.body
        );

        const giver = await this.seniorRepository.getById(receiverId);
        const receiver = await this.caregiverRepository.getById(giverId);

        if (!giver || !receiver) {
            res.status(404).json({ message: 'Giver or Receiver not found' });
            return;
        }

        if (rating < 0 || rating > 5) {
            res.status(400).json({ message: 'Rating must be between 0 and 5' });
            return;
        }

        try {
            const feedback = new FeedbackEntity(
                giver,
                receiver,
                comment,
                rating,
            );

            const newFeedback = await this.repository.create(feedback);
            res.status(201).json(newFeedback);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    };

    getGiverAndReciver = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const feedback = await this.repository.getGiverAndReciver(Number(id));
        if (!feedback) {
            res.status(404).json({ message: 'Feedback not found' });
            return;
        }
        res.status(200).json(feedback);
    };
}

export default FeedbackController;
