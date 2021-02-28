import { TestBed } from '@angular/core/testing';

import { RecipePreviewService } from './recipe-preview.service';

describe('RecipePreviewService', () => {
  let service: RecipePreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipePreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
