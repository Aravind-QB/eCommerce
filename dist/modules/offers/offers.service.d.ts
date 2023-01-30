import { Offer } from 'src/entities/offers/offers.entity';
import { Repository } from 'typeorm';
export declare class OffersService {
    private offerRepository;
    constructor(offerRepository: Repository<Offer>);
    createOffer(offer: Offer): Promise<Offer>;
    findAll(): Promise<Offer[]>;
}
