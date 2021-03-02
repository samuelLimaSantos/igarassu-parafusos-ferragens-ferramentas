import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { categoriesErrors } from '../errors/utils/ErrorsDescriptions';
import CategoryModel from '../models/Categories';

export default class CategoriesController {
  async create(request: Request, response: Response) : Promise<Response<CategoryModel>> {
    const { title } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required(categoriesErrors.titleRequired),
    });

    try {
      await schema.validate(request.body, { abortEarly: true });
    } catch (error) {
      throw new AppError(error.errors);
    }

    const categoryRepository = getRepository(CategoryModel);

    const categoryAlreadyExists = await categoryRepository.findOne({
      title,
    });

    if (categoryAlreadyExists) throw new AppError(categoriesErrors.categoryAlreadyExists);

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
