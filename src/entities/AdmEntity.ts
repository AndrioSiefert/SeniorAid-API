// import {
//     BaseEntity,
//     Column,
//     CreateDateColumn,
//     DeleteDateColumn,
//     Entity,
//     PrimaryGeneratedColumn,
//     UpdateDateColumn
// } from 'typeorm';

// @Entity('adms')
// export default class AdmEntity extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id!: number;

//     @Column({ nullable: true })
//     name?: string;

//     @Column({ nullable: true, unique: true })
//     user?: string;

//     @Column({ nullable: true })
//     password?: string;

//     @CreateDateColumn()
//     createdDate!: Date;

//     @UpdateDateColumn()
//     updatedDate!: Date;

//     @DeleteDateColumn()
//     deletedDate!: Date;

//     constructor(name?: string, user?: string, password?: string) {
//         super();
//         this.name = name;
//         this.user = user;
//         this.password = password;
//     }
// }
