import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import ServiceRequestEntity from './ServiceRequestEntity';
import CaregiverServiceEntity from './CaregiverServiceEntity';
import FeedbackEntity from './FeedbackEntity';
import UserEntity from './UserEntity';

@Entity('caregiver')
export default class CaregiverEntity extends UserEntity {
    @OneToOne(() => UserEntity, (user) => user.caregiver)
    user?: UserEntity;

    @OneToMany(() => ServiceRequestEntity, (request) => request.caregiver, {
        cascade: true,
    })
    serviceRequests!: ServiceRequestEntity[];

    @OneToMany(() => CaregiverServiceEntity, (service) => service.caregiver, {
        cascade: true,
    })
    service!: CaregiverServiceEntity;

    @OneToMany(() => FeedbackEntity, (feedback) => feedback.receiver, {
        cascade: true,
    })
    feedback!: FeedbackEntity[];
}
