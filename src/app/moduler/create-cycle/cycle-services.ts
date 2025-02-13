import { CreateCycle } from './cycle-interface';
import { CycleModel } from './cycle-model';

// cycle create services function
const createCycleServicesFun = async (cycle: CreateCycle) => {
  const result = await CycleModel.create(cycle);
  return result;
};

// get all cycle service function
const getAllProductServices = async (query: Record<string, unknown>) => {
  const { search, brand, category: type, max, min, inStock } = query;

  // Initialize an empty filter object
  const filter: Record<string, unknown> = {};

  // Case-insensitive search handling
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
  }

  // Price filtering logic
  if (min || max) {
    filter.price = {}; // Ensure price is an object
    if (min) (filter.price as Record<string, number>).$gte = Number(min);
    if (max) (filter.price as Record<string, number>).$lte = Number(max);
  }

  if (brand) filter.brand = brand;
  if (type) filter.category = type;

  // Availability filter
  if (inStock !== undefined) {
    filter.availability = inStock === 'true';
  }

  // Fetch products using the built filter
  const products = await CycleModel.find(filter);

  return products;
};

// get specfice cycle get into id function
const getCycleByIdServices = async (id: string) => {
  const result = await CycleModel.findById({ _id: id });
  return result;
};

// update details cycle function
const cycleDetailsUpdate = async (id: string, updateData: object) => {
  const datas = {
    $set: {
      ...updateData,
    },
  };
  const updateDatasbyId = await CycleModel.findByIdAndUpdate(
    { _id: id },
    datas,
    {
      new: true,
    },
  );
  return updateDatasbyId;
};

// delete cycle function
const deleteCycle = async (id: string) => {
  const deletecyclesByid = await CycleModel.deleteOne({ _id: id });
  return deletecyclesByid;
};
export const cycleServicesFun = {
  createCycleServicesFun,
  getAllProductServices,
  getCycleByIdServices,
  cycleDetailsUpdate,
  deleteCycle,
};
