import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Produto {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({default: 'Teste', nullable: false})
	name: string;

	@Column({ default: 'image.png', nullable: true})
	image: string;

	@Column({ default: '123', nullable: true})
	idAli: string;

	@Column({ nullable: true})
	link: string;

	@Column({ default: '1', nullable: true})
	category: string;

	@Column({default: true})
	isActive: boolean;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updated_at: Date;
}
