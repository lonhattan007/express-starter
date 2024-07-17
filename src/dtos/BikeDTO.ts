import { Bike } from "@/types/Bike";

// export default interface BikeDTO extends Omit<Bike, "id"> {}

export type BikeDTO = Omit<Bike, "id" | "name">;
