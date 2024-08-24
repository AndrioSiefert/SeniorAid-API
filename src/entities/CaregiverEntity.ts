import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import ServiceRequestEntity from './ServiceRequestEntity';
import CaregiverServiceEntity from './CaregiverServiceEntity';
import FeedbackEntity from './FeedbackEntity';
import UserEntity from './UserEntity';

@Entity('caregiver')
export default class CaregiverEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    cpf!: string;

    @Column()
    age!: number;

    @Column()
    phone!: string;

    @Column()
    cep!: string;

    @Column()
    neighborhood!: string;

    @Column()
    city!: string;

    @Column()
    state!: string;

    @Column()
    street!: string;

    @Column()
    address_number!: number;

    @Column()
    photo?: string;

    @OneToOne(() => UserEntity, (user) => user.caregiver)
    user?: UserEntity;

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
        password: string,
        cpf: string,
        age: number,
        phone: string,
        cep: string,
        neighborhood: string,
        city: string,
        state: string,
        street: string,
        address_number: number,
        photo?: string
    ) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
        this.age = age;
        this.phone = phone;
        this.cep = cep;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.street = street;
        this.address_number = address_number;
        this.photo = photo;
    }
}
