import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Topic } from 'src/app/interfaces/topicInformation.interface';
import { SessionService } from 'src/app/services/session.service';
import { ISubscriptionService } from 'src/app/interfaces/subscription.service.interface';
import { ITopicService } from 'src/app/interfaces/topic.service.interface';
import { ISubscriptionServiceToken, ITopicServiceToken } from 'src/app/interfaces/tokens';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-themes', // Sélecteur utilisé pour insérer ce composant dans un template HTML
  templateUrl: './themes.component.html', // Chemin vers le template HTML du composant
  styleUrls: ['./themes.component.scss'] // Chemin vers les styles CSS du composant
})
export class ThemesComponent implements OnInit, OnDestroy {
  topics: Topic[]; // Propriété pour stocker la liste des topics
  userId: number; // Propriété pour stocker l'ID de l'utilisateur
  private destroy$ = new Subject<void>(); // Subject utilisé pour gérer la destruction des observables

  // Le constructeur injecte les services nécessaires
  constructor(
    @Inject(ITopicServiceToken) private topicService: ITopicService, // Service pour gérer les topics
    @Inject(ISubscriptionServiceToken) private subscriptionService: ISubscriptionService, // Service pour gérer les souscriptions
    private sessionService: SessionService ,// Service pour gérer les sessions utilisateur
    private snackBar: MatSnackBar // Ajout ici
  ) { 
    this.topics = []; // Initialisation de la liste des topics
    this.userId = this.sessionService.getSessionInformation().id; // Récupération de l'ID de l'utilisateur à partir de la session
  }

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Appel au service pour récupérer les topics
    this.topicService.getTopics()
      .pipe(takeUntil(this.destroy$)) // Utilisation de takeUntil pour désinscrire l'observable
      .subscribe({
        next: data => {
          console.log('Topics received:', data);
          this.topics = data; // Mise à jour de la liste des topics avec les données reçues
        },
        error: error => {
          console.error('Erreur lors de la récupération des topics :', error); // Gestion des erreurs
        }
      });
  }

  // Méthode pour souscrire à un topic
  subscribeToTopic(topic: Topic) {
    this.subscriptionService.subscribeUserToTopic(topic.id, this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          console.log('Souscription réussie' + response);
          this.snackBar.open('Abonnement réussi !', 'Fermer', {
            duration: 3000, // Durée d'affichage : 3 secondes
            verticalPosition: 'top', // Affiché en haut de l'écran
            panelClass: ['success-snackbar'] // Classe CSS personnalisée (optionnelle)
          });
        },
        error: error => {
          console.error('Erreur lors de la souscription au topic :', error);
        }
      });
  }
  
  

  // Méthode appelée lors de la destruction du composant
  ngOnDestroy(): void {
    this.destroy$.next(); // Émission d'un signal pour désinscrire tous les observables
    this.destroy$.complete(); // Complétion du Subject
  }
}
