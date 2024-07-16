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

@Entity('caregiver-service')
export default class CaregiverServiceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    qualification: string;

    @Column()
    skills: string;

    @Column()
    aboutMe: string;

    @Column()
    experience: string;

    @Column()
    languages: string;

    @Column()
    description: string;

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
        qualification: string,
        skills: string,
        aboutMe: string,
        experience: string,
        languages: string,
        description: string,
        price: number,
        caregiverId: CaregiverEntity
    ) {
        super();
        this.qualification = qualification;
        this.skills = skills;
        this.aboutMe = aboutMe;
        this.experience = experience;
        this.languages = languages;
        this.description = description;
        this.price = price;
        this.caregiver = caregiverId;
    }
}
