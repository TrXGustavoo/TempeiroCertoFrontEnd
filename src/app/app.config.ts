import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; // Suas rotas
import { provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http'; // Importe provideHttpClient

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Adicione provideHttpClient() aqui para disponibilizar o HttpClient em toda a aplicação
    provideHttpClient(withInterceptorsFromDi(), withFetch()) // withFetch() é opcional mas recomendado para novas apps
    // Outros providers globais podem ir aqui
  ]
};