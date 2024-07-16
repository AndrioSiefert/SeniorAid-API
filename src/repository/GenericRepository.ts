import { BaseEntity, DeleteResult, Repository } from 'typeorm';

class GenericRepository<Entity extends BaseEntity> {
    protected repository: Repository<Entity>;

    constructor(repository: Repository<Entity>) {
        this.repository = repository;
    }

    async getAll(): Promise<Entity[]> {
        return this.repository.find();
    }

    async getById(id: string): Promise<Entity | undefined> {
        const result = await this.repository.findOne({
            where: { id } as any
        });
        return result || undefined;
    }

    async findOneByUser(user: string): Promise<Entity | null> {
        return (
            this.repository.findOne({ where: { user: user } } as any) || null
        );
    }

    async create(entity: Entity): Promise<Entity> {
        return this.repository.save(entity);
    }

    async update(id: string, update: Entity): Promise<Entity> {
        const isUpdated = await this.repository.findOne({
            where: { id }
        } as any);
        await this.repository.save({ ...isUpdated, ...update });
        return { ...isUpdated, ...update };
    }

    async delete(id: string): Promise<{ message: string }> {
        const deleteResult: DeleteResult = await this.repository.softDelete(id);
        if (deleteResult.affected === 0) {
            throw new Error('Erro ao deletar');
        }
        return { message: 'Deletado com sucesso' };
    }
}

export default GenericRepository;
