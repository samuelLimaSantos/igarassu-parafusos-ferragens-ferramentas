import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CategoryModel from '../models/Categories';

export default class CategoriesController {
  async create(request: Request, response: Response) : Promise<Response<CategoryModel>> {
    const { title } = request.body;

    const categoryRepository = getRepository(CategoryModel);

    const category = categoryRepository.create({
      title,
    });

    await categoryRepository.save(category);

    return response.status(201).json(category);
  }

  async store(request: Request, response: Response): Promise<Response<CategoryModel>> {
    const categoriesRepository = getRepository(CategoryModel);

    const categories = await categoriesRepository.find();

    return response.json(categories);
  }
}
