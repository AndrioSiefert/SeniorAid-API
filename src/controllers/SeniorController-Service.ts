import { Request, Response } from 'express';
import Controllers from './Controllers';
import SeniorServiceRepository from '../repository/Senior-Service-Repository';

class SeniorControllerService extends Controllers<SeniorServiceRepository> {
    constructor(repository: SeniorServiceRepository) {
        super(repository);
    }

    getService = async (req: Request, res: Response) => {
        try {
            const services = await this.repository.getService();
            res.status(200).json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    getBySeniorId = async (req: Request, res: Response) => {
        try {
            const seniorId = req.params.seniorId;
            const services = await this.repository.findBySeniorId(seniorId);
            res.status(200).json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    get = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const service = await this.repository.findById(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
            res.status(200).json(service);
        } catch (error) {
            res.status(500).json(error);
        }
    };
}

export default SeniorControllerService;
