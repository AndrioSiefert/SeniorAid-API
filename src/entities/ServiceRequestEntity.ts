import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import CaregiverEntity from './CaregiverEntity';
import SeniorServiceEntity from './SeniorServiceEntity';
import FeedbackEntity from './FeedbackEntity';

@Entity('service-request')
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

    @OneToMany(() => FeedbackEntity, (feedback) => feedback.serviceRequest)
    feedbacks!: FeedbackEntity[];

    constructor(caregiver: CaregiverEntity, service: SeniorServiceEntity) {
        super();
        this.caregiver = caregiver;
        this.service = service;
        this.accepted = false;
    }
}
