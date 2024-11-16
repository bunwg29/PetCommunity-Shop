import PetModel from "../models/pet.model";
import { Request } from "express";

interface Pagination {
    currentPage: number;
    limitItems: number;
    skip?: number;
    totalPage?: number;
};
  
export const Pagination = async (req: Request, find: Object): Promise<Pagination> => {

    const Pagination: Pagination = {
        currentPage: 1,
        limitItems: 8
    };

    const page = req.query.page;

    if(page && typeof page === 'string') {
        Pagination.currentPage = parseInt(page);
    };

    Pagination.skip = (Pagination.currentPage - 1) * Pagination.limitItems;
    
    const countPet = await PetModel.countDocuments(find);

    const totalPage = Math.ceil(countPet / Pagination.limitItems);

    Pagination.totalPage = totalPage;

    return Pagination;

};