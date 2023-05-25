import { getRepos } from '@app/services/repoApi';
import useSWR from 'swr';
import { isEmpty } from 'lodash';
import useBoundStore from '@app/store/useBoundStore';

const useGetRepos = (repoName) => {
  const { data, isLoading, error, isError } = useSWR(`/search/repositories?q=${repoName}`, getRepos);
  const setRepos = useBoundStore((state) => state.setRepos);
  const setError = useBoundStore((state) => state.setError);
  const setRepoSearchKey = useBoundStore((state) => state.setSearchKey);

  if (!isLoading && !isEmpty(data)) {
    const repoResponse = data.data;
    setRepos(repoResponse);
    setRepoSearchKey(repoName);
  }

  if (isError && error) {
    setError(error);
  }

  return {
    isLoading
  };
};

export default useGetRepos;
