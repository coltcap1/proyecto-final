import { InjectionToken } from '@angular/core';
import { genericServiceInterface } from '../../models/genericService.interface';


export const GENERIC_SERVICE = new InjectionToken<genericServiceInterface<any>>('GENERIC_SERVICE');
