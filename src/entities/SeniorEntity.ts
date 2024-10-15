import { Entity, OneToMany, OneToOne } from 'typeorm';
import SeniorServiceEntity from './SeniorServiceEntity';
import UserEntity from './UserEntity';
import FeedbackEntity from './FeedbackEntity';

@Entity('senior')
export default class SeniorEntity extends UserEntity {
    @OneToMany(() => SeniorServiceEntity, service => service.senior, {
        cascade: true,
    })
    services!: SeniorServiceEntity[];

    @OneToOne(() => UserEntity, user => user.senior)
    user?: UserEntity;

    @OneToMany(() => FeedbackEntity, feedback => feedback.giver)
    feedbacks!: FeedbackEntity[];
}
