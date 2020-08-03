import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '12022022',
      user_id: '1243003',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12022022');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 8, 10, 9);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12022022',
      user_id: '1243004',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12022022',
        user_id: '1243003',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '12022022',
        user_id: '1243003',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '12022022',
        user_id: '12022022',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: '12022022',
        user_id: '132424',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: '12022022',
        user_id: '224242',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
