import { Request, Response } from 'express';
import CaregiverServiceRepository from '../repository/CaregiverServiceRepository';
import Controllers from './Controllers';

class CaregiverServiceController extends Controllers<CaregiverServiceRepository> {
    constructor(repository: CaregiverServiceRepository) {
        super(repository);
    }

    create = async (req: Request, res: Response) => {
        try {
            const { caregiverId } = req.body;
            const existingServices = await this.repository.checkService(
                caregiverId
            );

            if (existingServices) {
                res.status(400).json({ message: 'Service already exists' });
                return;
            }

            const service = await this.repository.create(req.body);
            await this.repository.save(service);

            res.status(201).json(service);
        } catch (error) {
            res.status(500).json(error);
        }
    };

    getInfoService = async (req: Request, res: Response) => {
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

    getCaregiverWithService = async (req: Request, res: Response) => {
        try {
            const services = await this.repository.allCaregiverWhithService();
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json(error);
        }
    };
}

export default CaregiverServiceController;
