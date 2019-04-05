import HomerWidget from './components/HomerWidget.vue';
import HomerReaderWidget from './components/HomerReaderWidget.vue';
import HomerGridReaderWidget from './components/HomerGridReaderWidget.vue';
import HomerParallelReaderWidget from './components/HomerParallelReaderWidget.vue';
import HomerReferenceInputWidget from './components/HomerReferenceInputWidget.vue';
import ReaderWidget from './reader/ReaderWidget.vue';
import SelectedTextInfoWidget from './reader/SelectedTextInfoWidget.vue';
import TextSizeWidget from './text-size/TextSizeWidget.vue';

export default {
  [HomerWidget.scaifeConfig.displayName]: HomerWidget,
  [ReaderWidget.scaifeConfig.displayName]: ReaderWidget,
  [HomerReaderWidget.scaifeConfig.displayName]: HomerReaderWidget,
  [HomerGridReaderWidget.scaifeConfig.displayName]: HomerGridReaderWidget,
  [HomerParallelReaderWidget.scaifeConfig.displayName]: HomerParallelReaderWidget,
  [TextSizeWidget.scaifeConfig.displayName]: TextSizeWidget,
  [SelectedTextInfoWidget.scaifeConfig.displayName]: SelectedTextInfoWidget,
  [HomerReferenceInputWidget.scaifeConfig.displayName]: HomerReferenceInputWidget,
};
