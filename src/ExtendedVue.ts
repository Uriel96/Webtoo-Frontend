import { Vue } from 'vue-property-decorator';
import { DesignEditorModule } from './store/modules/editor';

export default abstract class ExtendedVue extends Vue {
  public editor!: DesignEditorModule;
}
