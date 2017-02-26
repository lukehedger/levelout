import Inferno from 'inferno';
import Component from 'inferno-component';

import Text from '~/shared/components/text';

class App extends Component {
  componentDidMount() {
    console.log('🕹 L E V E L  O U T');
  }

  render() {
    return (
      <div>

        <Text>Level Out</Text>

      </div>
    );
  }
}

Inferno.render(<App />, document.getElementById('Root'));
