import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ServiceRequestEntity from './ServiceRequestEntity';
import CaregiverServiceEntity from './CaregiverServiceEntity';
import FeedbackEntity from './FeedbackEntity';

@Entity('caregiver')
export default class CaregiverEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToMany(() => ServiceRequestEntity, (request) => request.caregiver, {
        cascade: true
    })
    serviceRequests!: ServiceRequestEntity[];

    @OneToMany(() => CaregiverServiceEntity, (service) => service.caregiver, {
        cascade: true
    })
    service!: CaregiverServiceEntity;

    @OneToMany(() => FeedbackEntity, (feedback) => feedback.caregiver)
    feedbacks!: FeedbackEntity[];
}
