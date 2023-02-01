  import { IsNotEmpty } from 'class-validator';
  import { User } from 'src/entities/users/users.entity';
  
  export class OrderDTO {
  
    @IsNotEmpty()
    grandTotal: string;
  
    @IsNotEmpty()
    status: string;

    @IsNotEmpty()
    user: User;

    @IsNotEmpty()
    orderItems: Items[];
  }
  
  export class Items {

    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    total: string;

    @IsNotEmpty()
    quantity: string;
  }