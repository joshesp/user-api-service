import { Router } from 'express';
import { CONTEXT_API, VERSION_SERVICE } from '../config/constanst';

const routesService = Router()

routesService.get(`${CONTEXT_API}/v1`, (_, res) => res.json({'version': VERSION_SERVICE}));

export default routesService