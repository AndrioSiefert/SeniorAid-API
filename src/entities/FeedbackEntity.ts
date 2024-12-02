import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import CaregiverEntity from './CaregiverEntity';
import SeniorEntity from './SeniorEntity';

@Entity('feedback')
export default class FeedbackEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    comment!: string;

    @Column({ type: 'int', default: 0 })
    rating!: number;

    @Column()
    giverId!: number;

    @Column()
    receiverId!: number;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @DeleteDateColumn()
    deletedDate!: Date;

    @ManyToOne(() => SeniorEntity, { nullable: false })
    giver!: SeniorEntity;

    @ManyToOne(() => CaregiverEntity, { nullable: false })
    receiver!: CaregiverEntity;

    constructor(giver: SeniorEntity, receiver: CaregiverEntity, comment: string, rating: number) {
        super();
        this.giver = giver;
        this.receiver = receiver;
        this.comment = comment;
        this.rating = rating;
    }
}
