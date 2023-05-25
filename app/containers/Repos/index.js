/**
 *
 * Repos Container
 *
 */
import Recommended from '@app/components/Recommended';
import { Container } from '@app/components/styled';
import ErrorState from '@components/ErrorState';
import RepoList from '@components/RepoList/index';
import { CustomCard, YouAreAwesome } from '@components/styled/repos';
import T from '@components/Text';
import { fonts } from '@themes';
import { Divider, Input, Row } from 'antd';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import useGetRepos from './hooks/useGetRepos';
import useBoundStore from '@app/store/useBoundStore';

export function Repos({ intl, error, recommendations }) {
  const repoSearchKey = useBoundStore((state) => state.searchKey);
  const setRepoSearchKey = useBoundStore((state) => state.setSearchKey);

  const { isLoading: repoLoading } = useGetRepos(repoSearchKey);

  const repos = useBoundStore((state) => state.repos);

  const handleOnChange = debounce((rName) => {
    if (!isEmpty(rName)) {
      setRepoSearchKey(rName);
    }
  }, 400);

  return (
    <Container
      padding={20}
      maxwidth={500}
      style={{
        height: '100vh',
        alignSelf: 'center'
      }}
    >
      <Row>
        <T id="recommended" styles={fonts.style.subheading()} />
      </Row>
      <Row justify="space-between">
        <Recommended recommendations={recommendations} />
        <YouAreAwesome href="https://www.iamawesome.com/">
          <T id="you_are_awesome" />
        </YouAreAwesome>
      </Row>
      <Divider />
      <CustomCard title={intl.formatMessage({ id: 'repo_search' })} maxwidth={500}>
        <T marginBottom={10} id="get_repo_details" />
        <Input.Search
          data-testid="search-bar"
          defaultValue={repoSearchKey}
          type="text"
          onChange={(evt) => handleOnChange(evt.target.value)}
          onSearch={(searchText) => handleOnChange(searchText)}
        />
      </CustomCard>
      <RepoList reposData={repos} loading={repoLoading} repoName={repoSearchKey} />
      <ErrorState reposData={repos} loading={repoLoading} reposError={error} />
    </Container>
  );
}

Repos.propTypes = {
  intl: PropTypes.any,
  searchKey: PropTypes.string,
  repos: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
  )
};

Repos.defaultProps = {
  padding: 20,
  maxwidth: 500
};

export default injectIntl(Repos);

export const ReposTest = injectIntl(Repos);
