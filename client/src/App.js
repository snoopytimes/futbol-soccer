import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Fixtures from './components/Fixtures';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((json) => setData(json.message));
  }, []);

  return (
    <div className='app'>
      <header className='App-header'>
        <div>
          <nav
            style={{
              borderBottom: 'solid 1px',
              paddingBottom: '1rem',
            }}
          >
            <Link to='/allfixtures'>Fixtures</Link> |{' '}
            <Link to='/expenses'>Expenses</Link>
          </nav>
          <p>{!data ? 'Loading...' : data}</p>
          <Outlet />
        </div>
      </header>
    </div>
  );
};

export default App;
