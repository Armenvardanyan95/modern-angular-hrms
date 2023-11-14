import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

let service: AuthService;
let httpMock: HttpTestingController;
let localStorageMock: Pick<Storage, 'getItem'>;

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        TestBed.runInInjectionContext(() => {
            service = new AuthService();
        });
        httpMock = TestBed.inject(HttpTestingController);

        localStorageMock = {
          getItem: jest
            .fn()
            .mockImplementation((arg) => 'mock token'),
        };
        Object.defineProperty(window, 'localStorage', {
          value: localStorageMock,
        });
    });

    it('should be successfully instantiated', () => {
        expect(service).toBeTruthy();
    });

    it('should log the user is', () => {
        service.login({email: 'test', password: 'test'}).subscribe((res) => {
            expect(res).toBe({token: 'mock token'});
            expect(service.isAuth$.getValue()).toBe(true);
        });

        const request = httpMock.expectOne({
            url: '/api/auth/login',
            method: 'POST',
        });

        request.flush({token: 'mock token'});
    });

    it('should return the token', () => {
        expect(service.getToken()).toBe('mock token');
    });
});