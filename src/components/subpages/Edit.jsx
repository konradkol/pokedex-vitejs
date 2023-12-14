import { useContext } from 'react';

import { LoggedUserContext } from '../../context/LoggedUserContext';

import Layout from '../shared/Layout';

function Edit() {
  const { user } = useContext(LoggedUserContext);

  return (
    <Layout>
      {!user.isLogged ? (
        <h2>Najpierw musisz się zalogować</h2>
      ) : (
        <div>edit pages</div>
      )}
    </Layout>
  );
}

export default Edit;
