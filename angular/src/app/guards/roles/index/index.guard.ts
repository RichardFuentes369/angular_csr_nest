import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';

export const indexGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const token = localStorage.getItem('token')

  if(token == null){
    return true
  }else if(await authService.isAuth('authadmin')){
    const url = router.navigate(['/admin/perfil']);
    return url;
  }else if(await authService.isAuth('authuser')){
    const url = router.navigate(['/user/perfil']);
    return url;
  }else{
    const url = router.navigate(['/inicio/inicio']);
    return url;
  }
};
