import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CategoryModel from '../models/Categories';

export default class CategoriesController {
  async create(request: Request, response: Response) {
    const { title } = request.body;

    const categoryRepository = getRepository(CategoryModel);

    const category = categoryRepository.create({
      title,
    });

    await categoryRepository.save(category);

    return response.status(201).json(category);
  }
}
