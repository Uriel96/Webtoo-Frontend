<template>
  <sui-segment class="full-size">
    <sui-dimmer :active="!loaded">
      <sui-loader>Loading...</sui-loader>
    </sui-dimmer>
    <iframe ref="frame" class="custom-frame" @load="renderChildren"></iframe>
  </sui-segment>
</template>

<script lang='ts'>
import { Component, Prop, Watch } from 'vue-property-decorator';
import ExtendedVue from '@/ExtendedVue';
import Vue, { VNode, VNodeData } from 'vue';
import { ComponentInfo, ScriptData, LinkData, LibraryInfo } from '@/models';
import { loadScripts, loadScript, loadLinks, loadLink } from '@/services/dependenciesLoader';
import axios from 'axios';
import { waitForGlobal, waitFor, get } from '@/utilities';
import { generateCode } from '@/services/codeGenerator';

type FrameApp = { children: Readonly<VNode[]> | undefined } & object &
  Record<never, any> &
  Vue;

@Component
export default class PreviewFrame extends ExtendedVue {
  @Prop() public componentId!: string;
  @Prop() public properties!: { [propertyId: string]: any };

  public loaded = false;
  public baseURL = 'http://localhost:8000';

  get document(): Document {
    return (this.$refs.frame as any).contentDocument;
  }
  get window(): any {
    return (this.$refs.frame as any).contentWindow;
  }
  get component() {
    return this.editor.getComponent(this.componentId);
  }
  get code() {
    return generateCode(this.editor, this.component!);
  }
  @Watch('component', { immediate: true, deep: true })
  public onComponentChanged(val: any, oldVal: any) {
    if (this.$refs.frame) {
      (this.$refs.frame as any).contentWindow.location.reload(true);
    }
  }

  public renderChildren() {
    this.updateCode();
  }
  public updateCode(component?: ComponentInfo) {
    this.loaded = false;
    if (!component) {
      component = this.component;
    }
    const code = generateCode(this.editor, component!);
    const updateCode = axios.post(`${this.baseURL}/load/file/${this.componentId}/code/index.vue`, { code });
    const generateComponent = axios.get(`${this.baseURL}/generate/${this.componentId}`);
    const getDependencies = axios.get(`${this.baseURL}/load/dependencies/${this.componentId}`);
    Promise.all([updateCode, generateComponent, getDependencies])
      .then((res: any) => res[2].data)
      .then((configData: any) => {
        this.loadDependencies(configData.dependencies);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  }
  public loadDependencies(dependencies: any) {
    const { body, head } = (this.$refs.frame as any).contentDocument;
    const loadedScripts = dependencies.scripts.map((script: ScriptData) => loadScript(script, body));
    const loadedLinks = dependencies.links.map((link: LinkData) => loadLink(link, head));
    const waitedComponent = waitFor(() => !!(this.$refs.frame as any).contentWindow[this.componentId]);
    Promise.all([...loadedScripts, ...loadedLinks, waitedComponent])
      .then(() => {
        this.loadComponent();
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  }
  public loadComponent() {
    const { body, head } = (this.$refs.frame as any).contentDocument;
    const children = this.$slots.default;
    const InternalVue = (this.$refs.frame as any).contentWindow.Vue;
    InternalVue.config.productionTip = false;
    // TODO: Add custom configuration to load all dependencies.
    InternalVue.use((this.$refs.frame as any).contentWindow.SemanticUIVue);
    const newComponent = (this.$refs.frame as any).contentWindow[this.componentId];
    const ComponentClass = InternalVue.extend(newComponent);
    const instance = new ComponentClass({
      propsData: this.properties,
    });
    instance.$mount();
    body.innerHTML = '';
    body.appendChild(instance.$el);
    this.loaded = true;
  }
}
</script>

<style scoped>
.custom-frame {
  margin: 0px;
  padding: 0px;
  border-style: solid;
  border-width: 0px;
  height: 100%;
  width: 100%;
}
</style>
