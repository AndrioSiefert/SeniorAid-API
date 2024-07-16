import SeniorEntity from './SeniorEntity';
import ServiceRequestEntity from './ServiceRequestEntity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('senior-service')
export default class SeniorServiceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    serviceType: string;

    @Column()
    dateService: Date;

    @Column()
    time: string;

    @Column()
    medications: string;

    @Column()
    location: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    urgencyLevel: string;

    @Column()
    seniorId?: string;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;

    @DeleteDateColumn({ nullable: true })
    deletedDate!: Date | null;

    @ManyToOne(() => SeniorEntity, (senior) => senior.services)
    @JoinColumn({ name: 'seniorId' })
    senior!: SeniorEntity;

    @OneToMany(() => ServiceRequestEntity, (request) => request.service, {
        cascade: true
    })
    @JoinColumn({ name: 'service_id' })
    serviceRequests!: ServiceRequestEntity[];

    constructor(
        serviceType: string,
        dateService: Date,
        time: string,
        medications: string,
        location: string,
        description: string,
        price: string,
        urgencyLevel: string,
        seniorId: SeniorEntity
    ) {
        super();
        this.serviceType = serviceType;
        this.dateService = dateService;
        this.time = time;
        this.medications = medications;
        this.description = description;
        this.location = location;
        this.price = price;
        this.urgencyLevel = urgencyLevel;
        this.senior = seniorId;
    }
}
