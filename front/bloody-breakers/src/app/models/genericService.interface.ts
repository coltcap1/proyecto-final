import { Observable } from 'rxjs';

export interface genericServiceInterface<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
  create(entity: T): Observable<T>;
  update(id: number, entity: T): Observable<T>;
  delete(id: number): Observable<void>;
}
