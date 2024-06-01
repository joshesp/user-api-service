import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: "50", comment: "Nombre completo del usuario" })
    name!: string;

    @Column({ length: "50", comment: "Apellido del usuario" })
    lastname!: string;

    @Column({ length: "50", unique: true, comment: "Correo electrónico del usuario" })
    email!: string;

    @Column({ comment: "Contraseña del usuario" })
    password!: string;

    @Column({ name: "account_blocked", default: false, comment: "Indica si el usuario está bloqueado(temporalmente o permanentemente)" })
    isAccountBlocked!: boolean;

    @CreateDateColumn({ name: "created_at", comment: "Fecha de creación del usuario" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", comment: "Fecha de actualización del usuario" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", comment: "Fecha de eliminación del usuario" })
    deletedAt!: Date;
}