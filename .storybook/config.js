import { configure } from '@storybook/react';
import '../src/lib/styles/global.scss'
import '../src/modules/color-palette/color-palette.scss';

import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);

function loadStories() {
  require('../src/stories/index.tsx');
  require('../src/stories/alert.stories');
  require('../src/stories/badge.stories');
  require('../src/stories/block-header.stories');
  require('../src/stories/button.stories');
  require('../src/stories/checkbox.stories');
  require('../src/stories/card.stories');
  require('../src/stories/collapse.stories');
  require('../src/stories/color-palette.stories');
  require('../src/stories/crop-image.stories');
  require('../src/stories/dates.stories');
  require('../src/stories/dropdown.stories');

  require('../src/stories/font.stories');
  require('../src/stories/icons.stories');
	require('../src/stories/text-input.stories');
  require('../src/stories/handlebar.stories');
  require('../src/stories/loader.stories');
  // list
  require('../src/stories/list/flat.stories');
  require('../src/stories/list/group.stories');
	require('../src/stories/json.stories');
  require('../src/stories/menu.stories');
  require('../src/stories/modal.stories');
  require('../src/stories/notifications.stories');
  require('../src/stories/notify.stories');
  require('../src/stories/numbers.stories');
  require('../src/stories/key-value.stories');
  require('../src/stories/radio.stories');
  // tree
  require('../src/stories/tree/tree.stories');
  require('../src/stories/tree/tree-multiline.stories');
	// select
	require('../src/stories/select/simple.stories');
	require('../src/stories/select/checkable.stories');
	require('../src/stories/select/tree.stories');
	require('../src/stories/select/checkable-tree.stories');
  // time picker
	require('../src/stories/storybook-provider.stories');
  require('../src/stories/time-picker.stories');

  require('../src/stories/sidebar.stories');
	require('../src/stories/side-panel.stories');
  require('../src/stories/table.stories');
  require('../src/stories/tag.stories');
  require('../src/stories/tab.stories');
  require('../src/stories/tooltip.stories');
  require('../src/stories/toggle.stories');
  require('../src/stories/fileUpload.stories');
}

configure(loadStories, module);
