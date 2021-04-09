import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { RecipePreviewService } from './recipe-preview.service';

describe('RecipePreviewService', () => {
  let service: RecipePreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(RecipePreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
