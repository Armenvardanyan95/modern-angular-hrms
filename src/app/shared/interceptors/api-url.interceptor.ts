import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function addApiUrl(req: HttpRequest<any>, next: HttpHandlerFn) {
    const url = req.url;
    const newUrl = 'http://localhost:3000' + url;
    const newReq = req.clone({ url: newUrl });
    return next(newReq);
}