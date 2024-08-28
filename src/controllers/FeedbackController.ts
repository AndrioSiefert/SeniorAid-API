import { Request, Response } from 'express';
import FeedbackRepository from '../repository/FeedbackRepository';
import Controllers from './Controllers';
import FeedbackEntity from '../entities/FeedbackEntity';
import CaregiverEntity from '../entities/CaregiverEntity';
import SeniorEntity from '../entities/SeniorEntity';
import SeniorRepository from '../repository/SeniorRepository';
import CaregiverRepository from '../repository/CaregiverRepository';

class FeedbackController extends Controllers<FeedbackRepository> {
    private seniorRepository: SeniorRepository;
    private caregiverRepository: CaregiverRepository;

    constructor(
        feedback: FeedbackRepository,
        seniorRepository: SeniorRepository,
        caregiverRepository: CaregiverRepository
    ) {
        super(feedback);
        this.seniorRepository = seniorRepository;
        this.caregiverRepository = caregiverRepository;
    }

    create = async (req: Request, res: Response): Promise<void> => {
        const { giverId, receiverId, comment, rating } = req.body;

        const giver = await this.caregiverRepository.getById(giverId);
        const receiver = await this.seniorRepository.getById(receiverId);

        if (!giver || !receiver) {
            res.status(404).json({ message: 'Giver or Receiver not found' });
            return;
        }

        const feedback = new FeedbackEntity(
            giverId,
            receiverId,
            comment,
            rating
        );
        const newFeedback = await this.repository.create(feedback);
        res.status(201).json(newFeedback);
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
