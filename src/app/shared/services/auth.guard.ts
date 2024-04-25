import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof localStorage !== 'undefined') {
    const user_id = JSON.parse(localStorage.getItem('user') as string);
    if (user_id) {
      return true;
    }
  }

  return false;
};

