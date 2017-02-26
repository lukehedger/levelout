import Inferno from 'inferno';
import Component from 'inferno-component';

import Text from '~/shared/components/text';

class App extends Component {
  componentDidMount() {
    console.log('🕹 L E V E L  O U T');
  }

  render({ children }) {
    return (
      <div>

        {children}

      </div>
    );
  }
}

export default App;
