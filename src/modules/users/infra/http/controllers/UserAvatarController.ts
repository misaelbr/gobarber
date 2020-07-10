import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user_id = request.user.id;

    const user = await updateUserAvatar.execute({
      user_id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
