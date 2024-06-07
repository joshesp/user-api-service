import bcrypt from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: "50", comment: "Nombre completo del usuario" })
    name!: string;

    @Column({ length: "50", comment: "Apellido del usuario" })
    lastname!: string;

    @Column({
        length: "50", unique: true, comment: "Correo electrónico del usuario"
    })
    email!: string;

    @Column({ comment: "Contraseña del usuario" })
    password!: string;

    @Column({
        name: "account_blocked",
        default: false,
        comment: "Indica si el usuario está bloqueado(temporalmente o permanentemente)"
    })
    isAccountBlocked!: boolean;

    @Column({
        name: "request_password_reset",
        default: false,
        comment: "Indica si el usuario solicitó una restablecimiento de contraseña"
    })
    requestPasswordReset!: boolean;

    @Column({
        name: "last_login",
        comment: "Fecha de última conexión del usuario",
        nullable: true
    })
    lastLogin!: Date;

    @CreateDateColumn({
        name: "created_at", comment: "Fecha de creación del usuario"
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_at", comment: "Fecha de actualización del usuario"
    })
    updatedAt!: Date;

    @DeleteDateColumn({
        name: "deleted_at", comment: "Fecha de eliminación del usuario"
    })
    deletedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
