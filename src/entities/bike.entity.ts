import { Bike } from "@/types/Bike";
import { IsInt, IsNumber, Min } from "class-validator";

export default class BikeEntity {
  @IsInt()
  id: number;

  brand: string;

  model: string;

  @IsNumber()
  @Min(0)
  displacement: number;

  @IsNumber()
  @Min(0)
  price: number;

  constructor(data: Bike) {
    this.id = data.id;
    this.brand = data.brand;
    this.model = data.model;
    this.displacement = data.displacement;
    this.price = data.price;
  }
}
