import { Request, Response } from 'express';
import CaregiverServiceRepository from '../repository/CaregiverServiceRepository';
import Controllers from './Controllers';
import { BadRequest, Conflict } from '../common/erro';

class CaregiverServiceController extends Controllers<CaregiverServiceRepository> {
    constructor(repository: CaregiverServiceRepository) {
        super(repository);
    }

    create = async (req: Request, res: Response) => {
        const { caregiverId } = req.body;
        const existingServices = await this.repository.checkService(caregiverId);
        if (existingServices) {
            throw new Conflict('Service already exists');
        }
        const service = await this.repository.create(req.body);
        await this.repository.save(service);

        res.status(201).json({ message: 'Service created successfully', service });
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
