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



  @Column({ length: 65, nullable: false })
  anuncio: string;

  @Column({ length: 65, nullable: false })
  imposto: string;

  @Column({ length: 65, nullable: false })
  taxa: string;

  @Column({ length: 65, nullable: false })
  frete: string;

  @Column({ length: 65, nullable: false })
  custo: string;

  @Column({ length: 65, nullable: false })
  lucro: string;

  @Column({ length: 65, nullable: false })
  formato: string;





  @Column({ default: true })
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
