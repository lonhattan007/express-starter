const DATA_FILE = "../../data/bikes.json";
const PAGE_SIZE = 10;

var bikesService = {
  initiated: { value: false },
  bikes: [],
  nextId: 1,

  async init() {
    this.bikes = require(DATA_FILE).bikes;
    this.nextId = this.bikes.length + 1;

    this.initiated.value = true;
    Object.freeze(this.initiated);
  },

  getInstance() {
    if (!this.initiated.value) {
      this.init();
    }
    return this;
  },

  /*
   * Find and return a bike with the given ID
   * @param {number} bikeId - the ID of the bike
   * */
  getIndexById(bikeId) {
    let start = 0;
    let end = this.bikes.length - 1;
    let mid;

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
  },

  getAllBikes() {
    return this.bikes;
  },

  getBikeById(bikeId) {
    const index = this.getIndexById(bikeId);

    if (index > -1) {
      return {
        success: true,
        data: this.bikes[index],
      };
    }

    return { success: false };
  },

  getBikesWithQuery(query) {
    let result = [...this.bikes];

    if (query.brand) {
      result = result.filter((bike) => bike.brand === query.brand);
    }

    if (query.model) {
      result = result.filter((bike) => bike.model === query.model);
    }

    if (query.lowDisplacement) {
      result = result.filter(
        (bike) => bike.displacement >= query.lowDisplacement,
      );
    }

    if (query.highDisplacement) {
      result = result.filter(
        (bike) => bike.displacement <= query.highDisplacement,
      );
    }

    if (query.lowPrice) {
      result = result.filter((bike) => bike.price >= query.lowPrice);
    }

    if (query.highPrice) {
      result = result.filter((bike) => bike.price <= query.highPrice);
    }

    const page = query.page;
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    if (page > totalPages) {
      return { success: false };
    }

    const offset = (page - 1) * PAGE_SIZE;
    result = result.slice(offset, Math.min(offset + PAGE_SIZE, result.length));

    return {
      success: true,
      data: result,
      pagination: {
        page: page,
        pageSize: PAGE_SIZE,
        totalItems: totalItems,
        totalPages: totalPages,
      },
    };
  },

  addBike(bike) {
    const bikeToAdd = {
      id: this.nextId++,
      ...bike,
    };
    this.bikes.push(bikeToAdd);

    return { success: true };
  },

  updateBike(bikeId, bike) {
    const idx = this.getIndexById(bikeId);

    if (idx > -1) {
      this.bikes[idx] = { ...bike };
      return { success: true };
    }

    return { success: false };
  },

  deleteBike(bikeId) {
    const idx = this.getIndexById(bikeId);

    if (idx > -1) {
      this.bikes = [...this.bikes.slice(0, idx), ...this.bikes.slice(idx + 1)];
      return { success: true };
    }

    return { success: false };
  },
};

Object.seal(bikesService);

module.exports = bikesService;
