import { configure, addDecorator,addParameters } from '@storybook/react';

import { withNotes } from '@storybook/addon-notes';
// import { addParameters} from '@storybook/addon-options';
import { themes } from '@storybook/theming';
addDecorator(withNotes);
addParameters( {
  options: {
  
    theme: {
     brandTitle: 'JionLab Stroybook'}

  }
  }
);
function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
