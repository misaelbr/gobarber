import { Router } from 'express';

import appointmentmentsRouter from './appointments.routes';
import usersRouter from './user.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
