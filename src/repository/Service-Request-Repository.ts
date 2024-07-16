import { Repository } from 'typeorm';
import ServiceRequestEntity from '../entities/ServiceRequestEntity';
import GenericRepository from './GenericRepository';

class ServiceRequestRepository extends GenericRepository<ServiceRequestEntity> {
    constructor(serviceRequest: Repository<ServiceRequestEntity>) {
        super(serviceRequest);
    }

    async getAllServiceRequests() {
        return await this.repository.find({
            relations: ['caregiver', 'service', 'service.senior']
        });
    }

    async getServiceRequestDetails(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['caregiver', 'service', 'service.senior']
        });
    }

    async acceptServiceRequest(id: string | undefined, accepted: boolean) {
        const serviceRequest = await this.repository.findOne({
            where: { id } as any
        });

        if (!serviceRequest) {
            return { message: 'Serviço não encontrado' };
        }

        if (serviceRequest.accepted) {
            return { message: 'Esse serviço já foi aceito' };
        }

        serviceRequest.accepted = accepted;

        await this.repository.save(serviceRequest);

        return { message: 'Serviço Aceito' };
    }
}

export default ServiceRequestRepository;
