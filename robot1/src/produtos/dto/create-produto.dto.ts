import {ApiProperty} from '@nestjs/swagger';
export class CreateProdutoDto {
	@ApiProperty({required: false, default: 'Daniel'})
	name: string;

	@ApiProperty({required: false, default: null})
	idAli: string;

	@ApiProperty({required: false, default: null})
	image: string;

	@ApiProperty({required: false, default: null})
	link: string;

	@ApiProperty({required: false, default: null})
	category: string;

	@ApiProperty({default: true})
	isActive: boolean;
}
