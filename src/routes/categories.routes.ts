import { Router } from 'express';
import CategoryController from '../controllers/CategoriesController';

const routes = Router();

const categoryController = new CategoryController();

routes.post('/', categoryController.create);

export default routes;
