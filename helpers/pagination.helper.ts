import { Request } from 'express';

interface Pagination {
  currentPage: number;
  limitItems: number;
  skip?: number;
  totalPage?: number;
}

export const Pagination = async (
  req: Request,
  model: any,
  find: Object = {}
): Promise<Pagination> => {
  const pagination: Pagination = {
    currentPage: 1,
    limitItems: 8,
  };

  const page = req.query.page;
  if (page && typeof page === 'string') {
    pagination.currentPage = parseInt(page);
  }

  pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

  const count = await model.countDocuments(find);
  const totalPage = Math.ceil(count / pagination.limitItems);
  pagination.totalPage = totalPage;

  return pagination;
};
