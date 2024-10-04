import CaregiverEntity from './CaregiverEntity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('caregiver_service')
export default class CaregiverServiceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    preference: string;

    @Column()
    experience: string;

    @Column()
    about: string;

    @Column()
    price: number;

    @Column()
    caregiverId?: string;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @DeleteDateColumn({ nullable: true })
    deletedDate!: Date | null;

    @ManyToOne(() => CaregiverEntity, (caregiver) => caregiver.service)
    @JoinColumn({ name: 'caregiverId' })
    caregiver!: CaregiverEntity;

    constructor(
        preference: string,
        experience: string,
        about: string,
        price: number,
        caregiverId: CaregiverEntity
    ) {
        super();
        this.preference = preference;
        this.experience = experience;
        this.about = about;
        this.price = price;
        this.caregiver = caregiverId;
    }
}
