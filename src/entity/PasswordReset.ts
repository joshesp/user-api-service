import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class PasswordReset {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    userId!: number

    @Column({ comment: "Identificador unico para validar el reset del password" })
    token!: string;

    @CreateDateColumn({
        name: "created_at", comment: "Fecha de creación del token"
    })
    createdAt!: Date;
}