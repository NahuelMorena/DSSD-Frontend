import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token-service';

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

    private readonly TOKEN_URL = 'https://oauth2.googleapis.com/token';
    private readonly CLIENT_ID = '749693468198-74ed2qo5csq1re8p55r2v2ejqsmmm0vf.apps.googleusercontent.com';
    private readonly CLIENT_SECRET = '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';
    private readonly REDIRECT_URI = 'http://localhost:4200/crearColeccion';
    private readonly SCOPE = 'https://www.googleapis.com/auth/drive';
    private url="https://www.googleapis.com"

  constructor(private route: ActivatedRoute, private http: HttpClient,private tokenService:TokenService) {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.getToken(code);
      }
    });
  }

  authenticate() {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&scope=${this.SCOPE}`;
    window.location.href = authUrl;
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    const params = new URLSearchParams();
    var token=this.tokenService.getToken();
    if(token!=null){
      params.set('token', token);
      params.set('client_id', this.CLIENT_ID);
    }
  
    return this.http.post<any>('https://oauth2.googleapis.com/revoke', params.toString(), { headers });
  }

  getToken(code: string) {
    const params = new URLSearchParams();
    params.set('code', code);
    params.set('client_id', this.CLIENT_ID);
    params.set('client_secret', this.CLIENT_SECRET);
    params.set('redirect_uri', this.REDIRECT_URI);
    params.set('grant_type', 'authorization_code');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    this.http.post<any>(this.TOKEN_URL, params.toString(), { headers }).subscribe(
      (response) => {
        console.log(response);
        this.tokenService.setToken(response.access_token);
      },
      (error) => {
        console.error('Error al obtener el token de acceso:', error);
      }
    );
  }

  containsGlobalFurniture(): Observable<any> {
   const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
    const fileName = 'GlobalFurniture';
    const query = `name='${fileName}'`;
    const queryParams = {
      q: query
    };
    
    return this.http.get<any>(this.url + '/drive/v3/files', { headers, params: queryParams });
  }

  createFolderGlobalFurnitureIfNotExists():Observable<any>{
    const folderMetadata = {
      name: "GlobalFurniture",
      mimeType: 'application/vnd.google-apps.folder'
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.url+"/drive/v3/files", folderMetadata, { headers });
  }

  createFolderCollection(folderId: string, fileName: string):Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
      'Content-Type': 'application/json'
    });

    const metadata = {
      name: fileName,
      parents: [folderId],
      mimeType: 'application/vnd.google-apps.folder'
    };

    return this.http.post<any>(this.url+"/drive/v3/files", metadata, { headers });
  }

  createImageFileInFolder(folderId: string, imageFile: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`
    });
  
    const metadata = {
      name: imageFile.name,
      mimeType: 'image/jpeg',
      parents: [folderId]
    };
  
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', imageFile);
  
    return this.http.post<any>(
      this.url + '/upload/drive/v3/files?uploadType=multipart',
      formData,
      { headers }
    );
  }

}
