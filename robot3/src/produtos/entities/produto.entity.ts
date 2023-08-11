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

	@Column({length: 65, default: 'Teste', nullable: false})
	name: string;

	@Column({length: 65, default: 'image.png', nullable: false})
	image: string;

	@Column({length: 65, default: '123', nullable: false})
	idAli: string;

	@Column({length: 65, default: 'http://', nullable: false})
	link: string;

	@Column({length: 65, default: '1', nullable: false})
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
