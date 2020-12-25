import { Request, Response } from 'express';
import SaveCSVFile from '../services/SaveCSVFile';

export default class ImportController {
  public async create(request: Request, response: Response): Promise<Response> {
    const saveCSVFile = new SaveCSVFile();

    saveCSVFile.execute();

    return response.status(201).json({ message: 'Register successfully.' });
  }
}
