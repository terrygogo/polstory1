import { configure, addDecorator } from '@storybook/react';

import { withNotes } from '@storybook/addon-notes';
import { withOptions } from '@storybook/addon-options';
import { themes } from '@storybook/components';
addDecorator(withNotes);
addDecorator(
  withOptions({
    theme: {},
    name: 'JionLab Stroybook',
     theme: themes.dark,
  })
);
function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
