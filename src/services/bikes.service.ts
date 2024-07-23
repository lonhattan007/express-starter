import { AppDataSource } from "@/data-source";
import { BikeDTO } from "@/dtos/BikeDTO";
import { BikeEntity } from "@/entities/bike.entity";
import { Bike } from "@/types/Bike";
import { GetBikesQuery } from "@/types/GetBikesQuery";
import { Pagination } from "@/types/Pagination";
import { LessThanOrEqual, MoreThanOrEqual, Between, Repository } from "typeorm";

export default class BikesService {
  private static instance: BikesService;
  private bikesRepository: Repository<BikeEntity>;

  constructor() {
    this.bikesRepository = AppDataSource.getRepository(BikeEntity);
  }

  static getInstance() {
    if (!BikesService.instance) {
      BikesService.instance = new BikesService();
    }
    return BikesService.instance;
  }

  async getBikeById(bikeId: number): Promise<
    | {
        success: true;
        data: Bike;
      }
    | { success: false }
  > {
    const result = await this.bikesRepository.findOne({
      where: {
        id: bikeId,
      },
      select: {
        id: true,
        brand: true,
        model: true,
        displacement: true,
        price: true,
      },
    });

    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  getRangedOptions(lower?: number, upper?: number) {
    if (lower && upper) {
      return Between(lower, upper);
    } else if (lower) {
      return MoreThanOrEqual(lower);
    } else if (upper) {
      return LessThanOrEqual(upper);
    } else {
      return;
    }
  }

  async getBikesWithQuery(query: GetBikesQuery) {
    const displacementQuery = this.getRangedOptions(
      query.minDisplacement,
      query.maxDisplacement,
    );

    const priceQuery = this.getRangedOptions(query.minPrice, query.maxPrice);

    const bikes = await this.bikesRepository.find({
      select: {
        id: true,
        brand: true,
        model: true,
        displacement: true,
        price: true,
      },
      where: {
        displacement: displacementQuery,
        price: priceQuery,
      },
      order: {
        updatedAt: "DESC",
      },
    });

    // TODO: Add paging mechanism

    //   const page = query.page!;
    //   const pageSize = query.pageSize!;
    //   const totalItems = result.length;
    //   const totalPages = Math.ceil(totalItems / pageSize);
    //
    //   if (page > totalPages) {
    //     return {
    //       success: false,
    //       error: "Page number exceeds total page available",
    //     };
    //   }
    //
    //   const offset = (page - 1) * pageSize;
    //   result = result.slice(offset, offset + pageSize);
    //
    //   return {
    //     success: true,
    //     data: result,
    //     pagination: {
    //       page: page,
    //       pageSize: pageSize,
    //       totalItems: totalItems,
    //       totalPages: totalPages,
    //     },
    //   };
    return {
      success: true,
      data: bikes,
    };
  }

  async addBike(newBike: BikeDTO) {
    const bike = this.bikesRepository.create(newBike);
    const result = await this.bikesRepository.save(bike);

    const returnedBike: Bike = { id: result.id, ...newBike };

    return { success: true, data: returnedBike };
  }

  async updateBike(bikeId: number, bikeDto: BikeDTO) {
    const bike = await this.bikesRepository.findOneBy({ id: bikeId });

    if (!bike) {
      return { success: false };
    }

    const result = this.bikesRepository.merge(bike, bikeDto).save();

    if (!result) {
      return { success: false };
    }

    return { success: true };
  }

  async deleteBikeFromRepo(bikeId: number) {
    const result = await this.bikesRepository
      .createQueryBuilder()
      .softDelete()
      .where("id = :id", {
        id: bikeId,
      })
      .execute();

    return result;
  }
}
