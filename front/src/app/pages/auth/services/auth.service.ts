// Importation des modules et interfaces nécessaires
import { Injectable, OnDestroy } from '@angular/core'; // Permet de décorer la classe pour l'injection de dépendance et gérer la destruction
import { HttpClient } from '@angular/common/http'; // Client HTTP pour effectuer des requêtes
import { Observable, Subject } from 'rxjs'; // Utilisé pour la gestion asynchrone et la désinscription
import { takeUntil } from 'rxjs/operators'; // Opérateur pour désinscrire les observables
import { LoginRequest } from 'src/app/interfaces/loginRequest.interface'; // Interface pour les données de connexion
import { RegisterRequest } from 'src/app/interfaces/registerRequest.interface'; // Interface pour les données d'inscription
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface'; // Interface pour les informations de session

// Décorateur Injectable pour permettre l'injection de cette classe comme dépendance dans d'autres classes
@Injectable({
  providedIn: 'root' // Spécifie que le service doit être disponible dans l'injecteur racine
})
export class AuthService implements OnDestroy {
  // Chemin de base pour les requêtes liées à l'authentification
  private pathService = 'api/auth';
  private destroy$ = new Subject<void>(); // Subject utilisé pour gérer la destruction des observables

  // Injection du client HTTP pour effectuer des requêtes
  constructor(private httpClient: HttpClient) { }

  // Méthode pour enregistrer un nouvel utilisateur
  // Prend en paramètre les données d'inscription et retourne un Observable de type void
  public register(registerRequest: RegisterRequest): Observable<void> {
    // Effectue une requête POST pour enregistrer un utilisateur, en envoyant les données d'inscription
    return this.httpClient.post<void>(`http://localhost:8080/api/auth/register`, registerRequest).pipe(
      takeUntil(this.destroy$) // Utilisation de takeUntil pour désinscrire l'observable
    );
  }

  // Méthode pour connecter un utilisateur
  // Prend en paramètre les données de connexion et retourne un Observable contenant les informations de session
  public login(loginRequest: LoginRequest): Observable<SessionInformation> {
    // Effectue une requête POST pour connecter un utilisateur, en envoyant les données de connexion
    return this.httpClient.post<SessionInformation>(`http://localhost:8080/api/auth/login`, loginRequest).pipe(
      takeUntil(this.destroy$) // Utilisation de takeUntil pour désinscrire l'observable
    );
  }

  // Méthode appelée lors de la destruction du service
  ngOnDestroy(): void {
    this.destroy$.next(); // Émission d'un signal pour désinscrire tous les observables
    this.destroy$.complete(); // Complétion du Subject
  }
}