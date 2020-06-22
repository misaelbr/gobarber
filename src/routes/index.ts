import { Router } from 'express';

import appointmentmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentmentsRouter);

export default routes;
