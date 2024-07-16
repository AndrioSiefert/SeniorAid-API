import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import SeniorServiceEntity from './SeniorEntity-Service';

@Entity('senior')
export default class SeniorEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
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

    @Column({ default: 'senior' })
    userType!: string;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @DeleteDateColumn()
    deletedDate!: Date;

    @OneToMany(() => SeniorServiceEntity, (service) => service.senior, {
        cascade: true
    })
    services!: SeniorServiceEntity[];

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
        address_number: number
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
        this.userType = 'senior';
    }
}
