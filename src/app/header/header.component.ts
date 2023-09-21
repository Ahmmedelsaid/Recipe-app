import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeStorage } from '../Recipe-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub!: Subscription;
  isAuthorized = false;
  constructor(
    private storage: RecipeStorage,
    private AuthService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userSub = this.AuthService.user.subscribe((user) => {
      this.isAuthorized = user ? true : false;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  saveRecipes() {
    this.storage.SaveRecipe();
  }
  fetchRecipes() {
    this.storage.FetchRecipe().subscribe();
  }
  ClearRecipes() {
    this.storage.Clear();
  }
  onLogout() {
    this.AuthService.logOut();
  }
}
