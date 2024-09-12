import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import CaregiverEntity from './CaregiverEntity';
import SeniorEntity from './SeniorEntity';

@Entity('user')
export default class UserEntity extends BaseEntity {
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
    age: number;

    @Column()
    phone: string;

    @Column()
    cep: string;

    @Column()
    neighborhood: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    street: string;

    @Column()
    address_number: number;

    @Column()
    photo: string;

    @Column()
    user_type?: 'senior' | 'caregiver';

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @DeleteDateColumn()
    deletedDate!: Date;

    @OneToOne(() => SeniorEntity, (senior) => senior.user, { nullable: true })
    @JoinColumn()
    senior?: SeniorEntity;

    @OneToOne(() => CaregiverEntity, (caregiver) => caregiver.user, {
        nullable: true
    })
    @JoinColumn()
    caregiver?: CaregiverEntity;

    constructor(
        name: string,
        email: string,
        password: string,
        cpf: string,
        age: number,
        phone: string,
        cep: string,
        city: string,
        state: string,
        neighborhood: string,
        street: string,
        address_number: number,
        photo: string,
        user_type: 'senior' | 'caregiver'
    ) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
        this.age = age;
        this.phone = phone;
        this.cep = cep;
        this.city = city;
        this.state = state;
        this.neighborhood = neighborhood;
        this.street = street;
        this.address_number = address_number;
        this.photo = photo;
        this.user_type = user_type;
    }
}
