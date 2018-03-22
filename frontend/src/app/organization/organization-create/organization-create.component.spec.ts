import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { OrganizationService } from '../organization.service';
import { OrganizationCreateComponent } from './organization-create.component';

describe('OrganizationCreateComponent', () => {
  let component: OrganizationCreateComponent;
  let fixture: ComponentFixture<OrganizationCreateComponent>;
  let organizationService: OrganizationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
       imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ OrganizationCreateComponent ],
      providers: [ OrganizationService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([OrganizationService], (_organizationsService) => {
    organizationService = _organizationsService;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
