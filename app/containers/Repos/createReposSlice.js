const createReposSlice = (set) => ({
  repos: {},
  loading: false,
  error: null,
  searchKey: '',
  setRepos: (reposList) =>
    set(() => {
      return { repos: reposList };
    }),
  setError: (errorMessage) => set(() => ({ error: errorMessage })),
  setSearchKey: (searchKey) => set(() => ({ searchKey }))
});

export default createReposSlice;
