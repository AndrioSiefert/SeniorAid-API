import { Repository } from 'typeorm';
import GenericRepository from './GenericRepository';
import SeniorServiceEntity from '../entities/SeniorServiceEntity';
import ServiceRequestEntity from '../entities/ServiceRequestEntity';

class SeniorServiceRepository extends GenericRepository<SeniorServiceEntity> {
    constructor(services: Repository<SeniorServiceEntity>) {
        super(services);
    }

    async ServiceAndSeniorInfo() {
        return await this.repository.find({
            relations: ['serviceRequests']
        });
    }

    async findByIdInfo(id: string) {
        return await this.repository.findOne({
            where: { id: Number(id) },
            relations: ['senior', 'serviceRequests']
        });
    }

    async findBySeniorId(seniorId: string) {
        return await this.repository.find({
            where: { seniorId: seniorId },
            relations: ['senior', 'serviceRequests']
        });
    }

    async updateServiceRequests(service: SeniorServiceEntity) {
        const serviceRequests = await this.repository.manager.find(
            ServiceRequestEntity,
            {
                where: { service }
            }
        );

        await Promise.all(
            serviceRequests.map(async (request) => {
                request.accepted = false;
                await this.repository.manager.save(request);
            })
        );
    }
}
export default SeniorServiceRepository;
