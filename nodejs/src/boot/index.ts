import { ISens, LaSens } from 'lasens'
import { LaVue, LaVueCO } from 'lasens/vue'
import Vue from "vue";
import { Session } from '~/boot/modules/Session'
import {Players} from "~/boot/modules/Players";

const modules = {
  session: Session,
  players: Players
}
//
//
export type XStore = ISens<typeof modules>
//
let xStore = LaSens(modules)
Vue.use(LaVue(xStore))

export const {actions} = xStore
actions.session.start()

declare module "vue/types/vue" {
  interface Vue {
    $flows: XStore['flows']
    $actions: XStore['actions']
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    from? : LaVueCO<XStore>

  }
}
