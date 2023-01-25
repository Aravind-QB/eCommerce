import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from 'src/entities/offers/offers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  createOffer(offer: Offer): Promise<Offer> {
    try {
      console.log(offer);
      const newoffer = this.offerRepository.save(offer);
      return newoffer;
    } catch (error) {
      return error;
    }
  }

  findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
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
