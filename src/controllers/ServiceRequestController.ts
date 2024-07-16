import ServiceRequestRepository from '../repository/ServiceRequestRepository';
import Controllers from './Controllers';
import { Request, Response } from 'express';
import ServiceRequestEntity from '../entities/ServiceRequestEntity';

class ServiceRequestController extends Controllers<ServiceRequestRepository> {
    constructor(repository: ServiceRequestRepository) {
        super(repository);
    }

    getAllServiceRequests = async (req: Request, res: Response) => {
        try {
            const serviceRequests =
                await this.repository.getAllServiceRequests();
            return res.status(200).json(serviceRequests);
        } catch (error) {
            return res.status(500).json(error);
        }
    };

    createRequest = async (req: Request, res: Response) => {
        const { caregiverId, serviceId } = req.body;

        try {
            const serviceRequest = new ServiceRequestEntity(
                caregiverId,
                serviceId
            );
            await this.repository.create(serviceRequest);
            return res.status(200).json(serviceRequest);
        } catch (error) {
            return res.status(500).json(error);
        }
    };

    getServiceRequestDetails = async (req: Request, res: Response) => {
        const { id } = req.params;
        const serviceRequest = await this.repository.getServiceRequestDetails(
            parseInt(id, 10)
        );
        return res.status(200).json(serviceRequest);
    };

    acceptServiceRequest = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res
                    .status(400)
                    .json({ message: 'ID parameter is required' });
            }

            const { accepted } = req.body;
            if (accepted === undefined) {
                return res
                    .status(400)
                    .json({ message: 'Accepted status is required' });
            }

            const serviceRequest = await this.repository.acceptServiceRequest(
                id,
                accepted
            );
            return res.status(200).json(serviceRequest);
        } catch (error) {
            return res.status(500).json(error);
        }
    };
}
export default ServiceRequestController;
