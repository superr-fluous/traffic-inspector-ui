import { Model, ModelFetched } from "../../model";

const adaptFetched = (fetched: ModelFetched): Model => fetched.map((l) => ({...l, x: l.x ?? -Infinity, y: l.y ?? -Infinity }))

export default {
  incoming: {
    self: adaptFetched,
  }
}