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

	@Column({length: 500, default: 'Teste', nullable: false})
	name: string;

	@Column({length: 500, default: 'image.png', nullable: true})
	image: string;

	@Column({length: 100, default: '123', nullable: true})
	idAli: string;

	@Column({length: 500, default: 'http://', nullable: true})
	link: string;

	@Column({length: 100, default: '1', nullable: true})
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
