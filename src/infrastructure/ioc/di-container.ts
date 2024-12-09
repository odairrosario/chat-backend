import { IocContainer } from '@tsoa/runtime';
import { container } from 'tsyringe';

export const iocContainer: IocContainer = {
  get: <T>(controllerClass: { prototype: T }): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return container.resolve(controllerClass as any);
  },
};
