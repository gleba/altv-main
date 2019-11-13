import {SoulController} from "./modules/SoulController";
import {Dynamique, IDynamique, LaSens} from "lasens";
import {NatsModule} from "~api/modules/NatsModule";
import {UserController} from "~api/modules/UserController";


const modules = {
  nats: NatsModule
}
const satellites = {
  SoulController,
  UserController
}
export type BStore = IDynamique<typeof modules, typeof satellites>
export const backStore = Dynamique(LaSens(modules), satellites)
const {actions} = backStore
// export const {flows} = backStore
export const {dynamique} = backStore

backStore.renew()

actions.nats.connect()
