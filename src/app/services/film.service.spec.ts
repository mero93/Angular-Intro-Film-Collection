import { TestBed } from '@angular/core/testing';

import mockFilms from '../../assets/films.json';
import { FilmService } from './film.service';

describe('FilmService', () => {
  let service: FilmService;

  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockFilms),
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it.each([
    { searchTerm: '', length: 12, firstId: 1, lastId: 12 },
    { searchTerm: 'Star Wars', length: 0, firstId: undefined, lastId: undefined },
    { searchTerm: 'matrix', length: 1, firstId: 6, lastId: 6 },
    { searchTerm: 'The ', length: 5, firstId: 3, lastId: 11 },
    { searchTerm: ' Inception  ', length: 1, firstId: 2, lastId: 2 },
    { searchTerm: '2014', length: 0, firstId: undefined, lastId: undefined },
  ])(
    'should filter list correctly',
    async ({
      searchTerm,
      length,
      firstId,
      lastId,
    }: {
      searchTerm: string;
      length: number;
      firstId: number | undefined;
      lastId: number | undefined;
    }) => {
      service.searchFilter.set(searchTerm);
      await service.loadFilms();
      const filteredFilms = service.filteredFilms();

      expect(filteredFilms.length).toBe(length);
      if (firstId) {
        expect(filteredFilms[0].id).toBe(firstId);
      }
      if (lastId) {
        expect(filteredFilms.at(-1)?.id).toBe(lastId);
      }
    },
  );

  it.each([1, 3, 7, 9])('should fetch film by id with films already loaded', async (id: number) => {
    const loadSpy = vi.spyOn(service, 'loadFilms');
    await service.loadFilms();

    const film = await service.loadById(id);

    expect(loadSpy).toHaveBeenCalledExactlyOnceWith();
    expect(film).toBeTruthy();
    expect(film?.id).toBe(id);
  });

  it.each([1, 3, 7, 9])('should fetch film by id with films not loaded', async (id: number) => {
    const loadSpy = vi.spyOn(service, 'loadFilms');

    const film = await service.loadById(id);

    expect(loadSpy).toHaveBeenCalledExactlyOnceWith();
    expect(film).toBeTruthy();
    expect(film?.id).toBe(id);
  });

  it("should return undefined when id isn't found", async () => {
    const loadSpy = vi.spyOn(service, 'loadFilms');

    const film = await service.loadById(0);

    expect(loadSpy).toHaveBeenCalledExactlyOnceWith();
    expect(film).toBeFalsy();
  });

  it.each([
    { id: 1, expected: true },
    { id: 3, expected: true },
    { id: 4, expected: true },
    { id: 8, expected: true },
    { id: 10, expected: true },
  ])(
    'should toggle isFavorite field',
    async ({ id, expected }: { id: number; expected: boolean }) => {
      await service.loadFilms();

      await service.toggleFavoriteStatus(id);

      const film = await service.loadById(id);

      expect(film?.id).toBe(id);
      expect(film?.isFavorite).toBe(expected);
    },
  );
});
