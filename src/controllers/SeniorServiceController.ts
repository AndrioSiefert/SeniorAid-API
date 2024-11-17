import { Request, Response } from 'express';
import Controllers from './Controllers';
import SeniorServiceRepository from '../repository/SeniorServiceRepository';

class SeniorServiceController extends Controllers<SeniorServiceRepository> {
    constructor(repository: SeniorServiceRepository) {
        super(repository);
    }

    create = async (req: Request, res: Response) => {
        try {
            const { seniorId } = req.body;
            const existingServices = await this.repository.findByIdInfo(seniorId);

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

    getServiceWithSeniorId = async (req: Request, res: Response) => {
        try {
            const { seniorId } = req.params;

            if (!seniorId) {
                return res.status(400).json({ message: 'Senior ID is required' });
            }

            const services = await this.repository.findSeniorServiceById(seniorId);
            if (!services || services.length === 0) {
                return res.status(404).json({ message: 'No services found for this Senior ID' });
            }

            res.status(200).json(services);
        } catch (error) {
            console.error(error); // Log para debugging
            res.status(500).json({ message: 'Internal server error', error });
        }
    };

    ServiceAndSeniorInfoGlobal = async (req: Request, res: Response) => {
        try {
            const services = await this.repository.ServiceAndSeniorInfo();
            res.status(200).json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    findForInfo = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const service = await this.repository.findByIdInfo(id);
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
            res.status(200).json(service);
        } catch (error) {
            res.status(500).json(error);
        }
    };
}

export default SeniorServiceController;
