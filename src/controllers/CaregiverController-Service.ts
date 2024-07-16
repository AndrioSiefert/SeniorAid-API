import { Request, Response } from 'express';
import CaregiverServiceRepository from '../repository/Caregiver-Service-Repository';
import Controllers from './Controllers';

class CaregiverServiceController extends Controllers<CaregiverServiceRepository> {
    constructor(repository: CaregiverServiceRepository) {
        super(repository);
    }

    create = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const existingService = await this.repository.checkService(id);

            if (existingService) {
                res.status(400).json({ message: 'Serviço já existe' });
                return;
            }

            const service = await this.repository.create(req.body);
            res.status(201).json(service);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    get = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const service = await this.repository.checkService(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
            res.status(200).json(service);
        } catch (error) {
            res.status(500).json(error);
        }
    };
}

export default CaregiverServiceController;
