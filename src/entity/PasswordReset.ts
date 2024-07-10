import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'password_reset' })
export class PasswordReset {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: "user_id" })
    userId!: number

    @Column({ comment: "Identificador unico para validar el reset del password" })
    token!: string;

    @CreateDateColumn({
        name: "created_at", comment: "Fecha de creación del token"
    })
    createdAt!: Date;
}