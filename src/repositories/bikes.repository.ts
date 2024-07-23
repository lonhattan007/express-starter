import { BikeEntity } from "@/entities/bike.entity";
import { Repository } from "typeorm";

export class BikesRepository extends Repository<BikeEntity> {}
