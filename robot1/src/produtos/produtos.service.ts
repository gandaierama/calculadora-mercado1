import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateProdutoDto} from './dto/create-produto.dto';
import {UpdateProdutoDto} from './dto/update-produto.dto';
import {Produto} from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>
  ) {}

  private readonly logger = new Logger(ProdutosService.name);
  private readonly loggerC = new Logger('CRON');

  create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    console.log('Back Create1', createProdutoDto);
    const obje = new Produto();
    obje.name = createProdutoDto.name;
    obje.idAli = createProdutoDto.idAli;
    obje.link = createProdutoDto.link;
    obje.image = createProdutoDto.image;
    obje.category = createProdutoDto.category;

  
    console.log('Back Create2', obje);
    return this.produtoRepository.save(obje);
  }

  async update(id, updateOrdemDto: UpdateProdutoDto) {
    // Update
    console.log(updateOrdemDto);
    await this.produtoRepository.update(id, {
      ...(updateOrdemDto.idAli && {idAli: updateOrdemDto.idAli}),
      ...(updateOrdemDto.name && {name: updateOrdemDto.name}),
      ...(updateOrdemDto.image && {image: updateOrdemDto.image}),
      ...(updateOrdemDto.link && {link: updateOrdemDto.link}),
      ...(updateOrdemDto.category && {category: updateOrdemDto.category}),
    });

    // Return
    return this.produtoRepository.findOneOrFail(id);
  }

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  countAll() {
    return this.produtoRepository.count();
  }

  findOne(id): Promise<Produto> {
    return this.produtoRepository.findOne(id);
  }


  async remove(id): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
