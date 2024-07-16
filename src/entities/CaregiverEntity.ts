import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import ServiceRequestEntity from './ServiceRequestEntity';
import CaregiverServiceEntity from './CaregiverServiceEntity';
import FeedbackEntity from './FeedbackEntity';

@Entity('caregiver')
export default class CaregiverEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    cpf: string;

    @Column()
    description: string;

    @Column()
    phone?: string;

    @Column()
    cep?: string;

    @Column()
    street?: string;

    @Column()
    neighborhood?: string;

    @Column()
    city?: string;

    @Column()
    state?: string;

    @Column()
    address_number?: string;

    @Column()
    photo?: string;

    @Column({ default: 'caregiver' })
    userType!: string;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @DeleteDateColumn()
    deletedDate!: Date;

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

    constructor(
        name: string,
        email: string,
        cpf: string,
        password: string,
        description: string,
        phone?: string
    ) {
        super();
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.description = description;
        this.userType = 'caregiver';
        this.phone = phone;
        this.password = password;
    }
}
