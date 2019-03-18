import LeftLayout from '@/components/LeftLayout.vue';
import DesignTab from '@/components/DesignTab.vue';
import { Pane } from '@/models';

export const defaultLayoutStructure: Pane = {
  entryId: 'main',
  structure: {
    main: {
      orientation: 'vertical',
      components: ['leftPane', 'rightPane'],
    },
    leftPane: {
      default: 30,
      min: 20,
      max: 40,
      opened: true,
      component: LeftLayout,
    },
    rightPane: {
      default: 70,
      opened: true,
      component: DesignTab,
    },
  },
};
