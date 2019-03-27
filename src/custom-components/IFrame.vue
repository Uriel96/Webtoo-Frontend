<template>
  <iframe class="custom-frame" @load="renderChildren" style></iframe>
</template>

<script lang='ts'>
import { Component, Prop } from 'vue-property-decorator';
import Vue, { VNode, VNodeData } from 'vue';

type FrameApp = { children: Readonly<VNode[]> | undefined } & object &
  Record<never, any> &
  Vue;

@Component({
  name: 'i-frame',
})
export default class IFrame extends Vue {
  public iApp!: FrameApp;
  @Prop() public scripts!: any[];
  @Prop() public links!: any[];

  public beforeUpdate() {
    this.iApp.children = Object.freeze(this.$slots.default);
  }

  public renderChildren() {
    const children = this.$slots.default;
    const document: Document = (this.$el as any).contentDocument;
    const body = document.body;
    const el = document.createElement('DIV');
    body.appendChild(el);
    const iApp = new Vue({
      name: 'iApp',
      data: { children: Object.freeze(children) },
      render(h) {
        return h('div', this.children as VNodeData | undefined);
      },
    });
    iApp.$mount(el);
    this.iApp = iApp;
  }
}
</script>

<style scope>
.custom-frame {
  margin: 0px;
  padding: 0px;
  border-style: solid;
  border-width: 0px;
  height: 100%;
  width: 100%;
}
</style>
