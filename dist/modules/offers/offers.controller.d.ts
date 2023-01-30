import { Offer } from 'src/entities/offers/offers.entity';
import { OffersService } from './offers.service';
export declare class OffersController {
    private readonly offerService;
    constructor(offerService: OffersService);
    createCategory(response: any, offer: Offer): Promise<any>;
    fetchAll(response: any): Promise<any>;
}
