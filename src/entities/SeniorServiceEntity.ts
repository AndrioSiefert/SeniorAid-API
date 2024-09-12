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

@Entity('senior_service')
export default class SeniorServiceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    serviceName: string;

    @Column()
    dateService: Date;

    @Column()
    time: string;

    @Column()
    place: string;

    @Column()
    medications: string;

    @Column()
    description: string;

    @Column()
    price: string;

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
        serviceName: string,
        dateService: Date,
        time: string,
        place: string,
        medications: string,
        description: string,
        price: string,
        seniorId: SeniorEntity
    ) {
        super();
        this.serviceName = serviceName;
        this.dateService = dateService;
        this.time = time;
        this.place = place;
        this.medications = medications;
        this.description = description;
        this.price = price;
        this.senior = seniorId;
    }
}
