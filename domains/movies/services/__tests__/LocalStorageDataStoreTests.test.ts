import { LocalStorageDataStore } from "../LocalStorageDataStore";

describe("LocalStorageDataStore", () => {
  let dataStore: LocalStorageDataStore;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    localStorageMock = {};
    global.localStorage = {
      getItem: jest.fn((key) => localStorageMock[key] || null),
      setItem: jest.fn((key, value) => {
        localStorageMock[key] = value.toString();
      }),
      removeItem: jest.fn((key) => {
        delete localStorageMock[key];
      }),
      clear: jest.fn(() => {
        localStorageMock = {};
      }),
      length: 0,
      key: jest.fn((index) => ""),
    };
    dataStore = new LocalStorageDataStore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getFavorites", () => {
    it("should return an empty array when no favorites are stored", async () => {
      const favorites = await dataStore.getFavorites();
      expect(favorites).toEqual([]);
    });

    it("should return stored favorites", async () => {
      const storedFavorites = [1, 2, 3];
      localStorage.setItem("favoriteMovies", JSON.stringify(storedFavorites));
      const favorites = await dataStore.getFavorites();
      expect(favorites).toEqual(storedFavorites);
    });
  });

  describe("addFavorite", () => {
    it("should add a new favorite", async () => {
      await dataStore.addFavorite(1);
      const favorites = await dataStore.getFavorites();
      expect(favorites).toEqual([1]);
    });

    it("should not add duplicate favorites", async () => {
      await dataStore.addFavorite(1);
      await dataStore.addFavorite(1);
      const favorites = await dataStore.getFavorites();
      expect(favorites).toEqual([1]);
    });
  });

  describe("removeFavorite", () => {
    it("should remove a favorite", async () => {
      await dataStore.addFavorite(1);
      await dataStore.addFavorite(2);
      await dataStore.removeFavorite(1);
      const favorites = await dataStore.getFavorites();
      expect(favorites).toEqual([2]);
    });

    it("should not change favorites if movie ID is not found", async () => {
      await dataStore.addFavorite(1);
      await dataStore.removeFavorite(2);
      const favorites = await dataStore.getFavorites();
      expect(favorites).toEqual([1]);
    });
  });

  describe("isFavorite", () => {
    it("should return true for a favorite movie", async () => {
      await dataStore.addFavorite(1);
      const isFavorite = await dataStore.isFavorite(1);
      expect(isFavorite).toBe(true);
    });

    it("should return false for a non-favorite movie", async () => {
      const isFavorite = await dataStore.isFavorite(1);
      expect(isFavorite).toBe(false);
    });
  });
});
