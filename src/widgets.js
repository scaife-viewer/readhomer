import HomerReferenceInputWidget from './homer/widgets/HomerReferenceInputWidget.vue';
import HomerParallelEnglishWidget from './homer/widgets/HomerParallelEnglishWidget.vue';
import HomerParallelReaderWidget from './homer/widgets/HomerParallelReaderWidget.vue';
import TextSizeWidget from './reader/widgets/TextSizeWidget.vue';
import TextWidthWidget from './reader/widgets/TextWidthWidget.vue';
import CTSWidget from './reader/widgets/CTSWidget.vue';

export default {
  [HomerReferenceInputWidget.scaifeConfig.displayName]: HomerReferenceInputWidget,
  [TextSizeWidget.scaifeConfig.displayName]: TextSizeWidget,
  [TextWidthWidget.scaifeConfig.displayName]: TextWidthWidget,
  [CTSWidget.scaifeConfig.displayName]: CTSWidget,
  [HomerParallelEnglishWidget.scaifeConfig.displayName]: HomerParallelEnglishWidget,
  [HomerParallelReaderWidget.scaifeConfig.displayName]: HomerParallelReaderWidget,
};
