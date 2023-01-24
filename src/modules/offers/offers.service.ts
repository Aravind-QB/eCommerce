import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from 'src/entities/offers/offers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private usersRepository: Repository<Offer>,
  ) {}
  findAll(): Promise<Offer[]> {
    return this.usersRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        discountPercentage: true,
        thumbnail: true,
      },
      relations: {
        product: {
          productImages: true,
        },
      },
      where: {
        isActive: true,
      },
    });
  }
}
