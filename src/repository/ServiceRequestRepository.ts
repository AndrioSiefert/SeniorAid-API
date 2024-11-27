import { Repository } from 'typeorm';
import ServiceRequestEntity from '../entities/ServiceRequestEntity';
import GenericRepository from './GenericRepository';

class ServiceRequestRepository extends GenericRepository<ServiceRequestEntity> {
    constructor(serviceRequest: Repository<ServiceRequestEntity>) {
        super(serviceRequest);
    }

    async getServiceRequestDetails(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: ['service', 'caregiver', 'service.senior'],
        });
    }

    async findServiceRequest(caregiverId: number, serviceId: number) {
        return await this.repository.findOne({
            where: {
                caregiver: { id: caregiverId },
                service: { id: serviceId },
            },
            relations: ['service', 'caregiver', 'service.senior'],
        });
    }

    async createService(serviceRequest: ServiceRequestEntity) {
        return await this.save(serviceRequest);
    }

    async getServiceAllRequests() {
        return await this.repository.find({
            relations: ['service', 'caregiver', 'service.senior'],
        });
    }

    async acceptServiceRequest(id: number | undefined, accepted: boolean) {
        const serviceRequest = await this.repository.findOne({
            where: { id },
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

    async finishServiceRequest(id: number | undefined, finished: boolean) {
        const serviceRequest = await this.repository.findOne({
            where: { id },
        });

        if (!serviceRequest) {
            return { message: 'Serviço não encontrado' };
        }

        if (serviceRequest.finished) {
            return { message: 'Esse serviço já foi finalizado' };
        }

        serviceRequest.finished = finished;

        await this.repository.save(serviceRequest);

        return { message: 'Serviço Finalizado' };
    }
}

export default ServiceRequestRepository;
