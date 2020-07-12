import AppError from '@shared/errors/AppError';

import FakeAppointmentesRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentesRepository = new FakeAppointmentesRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentesRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12022022',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12022022');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentesRepository = new FakeAppointmentesRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentesRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12022022',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12022022',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
