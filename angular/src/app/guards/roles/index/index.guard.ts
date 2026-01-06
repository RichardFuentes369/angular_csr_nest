import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_FINAL_AUTH, STORAGE_KEY_TOKEN } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';

export const indexGuard: CanActivateFn = async(route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const token = localStorage.getItem(STORAGE_KEY_TOKEN)

  if(token == null){
    return true
  }else if(await authService.isAuth(STORAGE_KEY_ADMIN_AUTH)){
    const url = router.navigate(['/admin/perfil']);
    return url;
  }else if(await authService.isAuth(STORAGE_KEY_FINAL_AUTH)){
    const url = router.navigate(['/user/perfil']);
    return url;
  }else{
    const url = router.navigate(['/inicio/inicio']);
    return url;
  }
};
