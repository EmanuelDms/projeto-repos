import React, {useState, useEffect} from 'react';
import {Container, RepositoryContainer, Owner, Loading, Details, BackButton, IssuesList, PageActions, FilterList } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import UserRepository from '../../repositories/UserRepository';

export default function Repositorio({match}){

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, ] = useState([
    {state: 'all', label: 'Todas', active: true},
    {state: 'open', label: 'Abertas', active: false},
    {state: 'closed', label: 'Fechadas', active: false}
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const [repo, issues] = await Promise.all([
        UserRepository.get(nomeRepo),
        UserRepository.get(`${nomeRepo}/issues`, {
          params: {
            state: filters.find(f => f.active).state,
            per_page: 5
          }
        }),
      ]);

      setRepositorio(repo.data);
      setIssues(issues.data);
      setLoading(false);

    }

    load();

  }, [filters, match.params.repositorio]);

  useEffect(() => {
    async function loadIssue(){
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const response = await UserRepository.get(`${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5
        }
      });

      setIssues(response.data);
    }
    
    loadIssue();

  }, [filterIndex, filters, match.params.repositorio, page])

  function handleFilter(index) {
    setFilterIndex(index);
  }

  function handlePage(action) {
    setPage((action === 'back') ? page - 1 : page + 1);
  }

  if (loading) {
    return(
    <Loading>
      <h1>Carregando...</h1>
    </Loading>
    );
  }

  return(
    <Container>

      <BackButton to="/">
        <FaArrowLeft color="#FFF" size={35} />
      </BackButton>

      <RepositoryContainer>
        <Owner>
          <img 
            src={repositorio.owner.avatar_url} 
            alt={repositorio.owner.login} 
          />

          <Details>
            <h1>{
            // First letter to Upper Case
            repositorio.name.toUpperCase()[0] + (repositorio.name.substring(1, repositorio.name.length))
            }</h1>
            <p>{repositorio.description}</p>
          </Details>
          <div className="clear"></div>
        </Owner>

        <FilterList active={filterIndex}>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              onClick={() => handleFilter(index)}
            >
              {filter.label}
            </button>
          ))}
        </FilterList>

        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>
                      {label.name}
                    </span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>

            </li>
          ))}
        </IssuesList>

        <PageActions>
          <button 
            type="button" 
            onClick={() => handlePage('back')}
            disabled={page < 2}
          >
            Voltar
          </button>
          <h4>{page}</h4>
          <button type="button" onClick={() => handlePage('next')}>
            Próxima
          </button>
        </PageActions>

      </RepositoryContainer>

    </Container>
  )
}