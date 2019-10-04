import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { User } from '../../models/users';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  const mockUsers: User[] = [
    { id: 1, avatar_url: '', html_url: '', login: 'loginname' },
    { id: 2, avatar_url: '', html_url: '', login: 'Nally Lowen' },
    { id: 3, avatar_url: '', html_url: '', login: 'na.lo@gmail.com' },
    { id: 4, avatar_url: '', html_url: '', login: 'test search' },

  ]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ScrollingModule,],
      declarations: [UsersListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Search', () => {
    beforeEach(() => {
      spyOn(component, 'searchMethod').and.callThrough();
      fixture.detectChanges;
      component.search = component.memoizedSearchFunc();
    });
    it('should return all users if search value is empty', () => {
      const result = component.search('', mockUsers);
      expect(result.length).toBe(4)
    });
    it('should not be case sensitive', () => {
      const result = component.search('Nally Lowen', mockUsers);
      expect(result.length).toBe(1)
    });
    describe('if search value contains white spaces', () => {
      it('should split search value and search for each fragment', () => {
        const result = component.search('Na Lo', mockUsers);
        expect(result.length).toBe(3)
      });
    })
    it('should cache search result', () => {
      component.search('Na Lo', mockUsers);
      component.search('Na Lo', mockUsers);
      expect(component.searchMethod).toHaveBeenCalledTimes(1);
    });
    describe("'Na Lo' search Value", () => {
      it(" should return 'Nally Lowen', 'loginname' and 'na.lo@gmail.com'", () => {
        const result = component.search('na lo', mockUsers);
        expect(result.length).toBe(3)
      });
    });
  })
});
