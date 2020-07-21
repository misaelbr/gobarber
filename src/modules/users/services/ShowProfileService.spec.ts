import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const showProfileUSer = await showProfile.execute({
      user_id: user.id,
    });

    expect(showProfileUSer.name).toBe('John Doe');
    expect(showProfileUSer.email).toBe('johndoe@example.com');
  });

  it('should not be able show the profile of invalid user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-valid-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
