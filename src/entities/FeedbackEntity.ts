import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import ServiceRequestEntity from './ServiceRequestEntity';
import CaregiverEntity from './CaregiverEntity';

@Entity('feedback')
export default class FeedbackEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    comments!: string;

    @Column({ type: 'int', default: 0 })
    rating!: number;

    @CreateDateColumn()
    createdDate!: Date;

    @ManyToOne(
        () => ServiceRequestEntity,
        (serviceRequest) => serviceRequest.feedbacks
    )
    serviceRequest!: ServiceRequestEntity;

    @ManyToOne(() => CaregiverEntity, (caregiver) => caregiver.feedbacks)
    caregiver!: CaregiverEntity;

    constructor(
        comments: string,
        rating: number,
        serviceRequest: ServiceRequestEntity,
        caregiver: CaregiverEntity
    ) {
        super();
        this.comments = comments;
        this.rating = rating;
        this.serviceRequest = serviceRequest;
        this.caregiver = caregiver;
    }
}
