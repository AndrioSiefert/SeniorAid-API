import { Repository } from 'typeorm';
import GenericRepository from './GenericRepository';
import SeniorServiceEntity from '../entities/SeniorServiceEntity';
import ServiceRequestEntity from '../entities/ServiceRequestEntity';

class SeniorServiceRepository extends GenericRepository<SeniorServiceEntity> {
    constructor(services: Repository<SeniorServiceEntity>) {
        super(services);
    }

    async findByIdInfo(id: string) {
        return await this.repository.findOne({
            where: { id: Number(id) },
            relations: ['senior', 'serviceRequests'],
        });
    }

    async ServiceAndSeniorInfo() {
        return await this.repository.find({
            relations: ['senior'],
        });
    }

    async updateServiceRequests(service: SeniorServiceEntity) {
        const serviceRequests = await this.repository.manager.find(ServiceRequestEntity, {
            where: { service },
        });

        await Promise.all(
            serviceRequests.map(async (request) => {
                request.accepted = false;
                await this.repository.manager.save(request);
            }),
        );
    }
}
export default SeniorServiceRepository;
