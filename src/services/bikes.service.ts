import { BikeDTO } from "@/dtos/BikeDTO";
import { Bike } from "@/types/Bike";
import { GetBikesQuery } from "@/types/GetBikesQuery";
import { Pagination } from "@/types/Pagination";
import { bikes } from "@data/bikes.json";

export default class BikesService {
  private static instance: BikesService;

  private bikes: Bike[] = [];
  private nextId: number = 1;

  constructor() {
    this.bikes = bikes;
    this.nextId = this.bikes.length + 1;
  }

  static getInstance() {
    if (!BikesService.instance) {
      BikesService.instance = new BikesService();
    }
    return BikesService.instance;
  }

  getIndexById(bikeId: number): number {
    let start = 0;
    let end = this.bikes.length - 1;
    let mid: number;

    while (start < end) {
      if (bikeId < this.bikes[start].id || bikeId > this.bikes[end].id) {
        return -1;
      }

      mid = Math.floor((start + end) / 2);

      if (bikeId === this.bikes[mid].id) {
        return mid;
      } else if (bikeId < this.bikes[mid].id) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    if (this.bikes[start].id === bikeId) {
      return start;
    }

    return -1;
  }

  getAllBikes(): Bike[] {
    return this.bikes;
  }

  getBikeById(bikeId: number): {
    success: boolean;
    data?: Bike;
  } {
    const index = this.getIndexById(bikeId);

    if (index > -1) {
      return {
        success: true,
        data: this.bikes[index],
      };
    }

    return { success: false };
  }

  getBikesWithQuery(query: GetBikesQuery): {
    success: boolean;
    error?: string;
    data?: Bike[];
    pagination?: Pagination;
  } {
    let result = [...this.bikes];

    if (query.brand) {
      result = result.filter((bike) => bike.brand === query.brand);
    }

    if (query.model) {
      result = result.filter((bike) => bike.model === query.model);
    }

    if (query.minDisplacement) {
      result = result.filter(
        (bike) => bike.displacement >= query.minDisplacement!,
      );
    }

    if (query.maxDisplacement) {
      result = result.filter(
        (bike) => bike.displacement <= query.maxDisplacement!,
      );
    }

    if (query.minPrice) {
      result = result.filter((bike) => bike.price >= query.minPrice!);
    }

    if (query.maxPrice) {
      result = result.filter((bike) => bike.price <= query.maxPrice!);
    }

    const page = query.page!;
    const pageSize = query.pageSize!;
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (page > totalPages) {
      return {
        success: false,
        error: "Page number exceeds total page available",
      };
    }

    const offset = (page - 1) * pageSize;
    result = result.slice(offset, offset + pageSize);

    return {
      success: true,
      data: result,
      pagination: {
        page: page,
        pageSize: pageSize,
        totalItems: totalItems,
        totalPages: totalPages,
      },
    };
  }

  addBike(bikeDto: BikeDTO): {
    success: boolean;
    data: Bike;
  } {
    const newBike: Bike = {
      id: this.nextId++,
      ...bikeDto,
    };

    this.bikes.push(newBike);

    return { success: true, data: newBike };
  }

  updateBike(
    bikeId: number,
    bikeDto: BikeDTO,
  ): {
    success: boolean;
  } {
    const idx = this.getIndexById(bikeId);

    if (idx > -1) {
      this.bikes[idx] = { id: this.bikes[idx].id, ...bikeDto };
      return { success: true };
    }

    return { success: false };
  }

  deleteBike(bikeId: number): {
    success: boolean;
  } {
    const idx = this.getIndexById(bikeId);

    if (idx > -1) {
      this.bikes = [...this.bikes.slice(0, idx), ...this.bikes.slice(idx + 1)];
      return { success: true };
    }

    return { success: false };
  }
}
