import ExtendedVue from '@/ExtendedVue';
import { PropertyDefinition } from '@/models';
import { get } from '@/utilities';

export default abstract class BaseProperty extends ExtendedVue {
  public propertyDef!: PropertyDefinition;

  get propertyData() {
    if (!this.editor.selectedElement) {
      return;
    }
    return get(this.editor.selectedElement.properties, this.propertyDef.id);
  }
  get isDynamic() {
    if (!this.propertyData) {
      return;
    }
    return this.propertyData.type === 'dynamic';
  }
}
