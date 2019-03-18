import ExtendedVue from '@/ExtendedVue';
import { PropertyDefinitionData } from '@/models';

export default abstract class BaseProperty extends ExtendedVue {
  public propertyDef!: PropertyDefinitionData;
  public propertyId!: string;

  get propertyData() {
    if (!this.editor.selectedComponent) {
      return;
    }
    return this.editor.selectedComponent.properties[this.propertyId];
  }
  get isDynamic() {
    if (!this.propertyData) {
      return;
    }
    return this.propertyData.type === 'dynamic';
  }
}
