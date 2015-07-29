import domready from 'domready';
import MainView from './view/main';


const app = {

  /**
   * Setup and configs
   */
  init() {

  },


  /**
   * Renders a Ractive instance
   */
  render() {

    const view = new MainView();

  }

};


domready(() => {

  app.init();
  app.render();

});
