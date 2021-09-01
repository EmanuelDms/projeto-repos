import React, {useState, useEffect} from 'react';
import {Container, RepositoryContainer, Owner, Loading, Details, BackButton, IssuesList } from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import UserRepository from '../../repositories/UserRepository';

export default function Repositorio({match}){

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const [repo, issues] = await Promise.all([
        UserRepository.get(nomeRepo),
        UserRepository.get(`${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        }),
      ]);

      setRepositorio(repo.data);
      setIssues(issues.data);
      setLoading(false);

    }

    load();
  }, []);

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
      </RepositoryContainer>
    </Container>
  )
}