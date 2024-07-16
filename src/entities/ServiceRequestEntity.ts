import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import CaregiverEntity from './CaregiverEntity';
import SeniorServiceEntity from './SeniorEntity-Service';

@Entity('service_request')
export default class ServiceRequestEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ default: false })
    accepted!: boolean;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @DeleteDateColumn()
    deletedDate!: Date;

    @ManyToOne(() => CaregiverEntity, (caregiver) => caregiver.serviceRequests)
    caregiver!: CaregiverEntity;

    @ManyToOne(
        () => SeniorServiceEntity,
        (service) => service.serviceRequests,
        { eager: true }
    )
    service!: SeniorServiceEntity;

    constructor(caregiver: CaregiverEntity, service: SeniorServiceEntity) {
        super();
        this.caregiver = caregiver;
        this.service = service;
        this.accepted = false;
    }
}
