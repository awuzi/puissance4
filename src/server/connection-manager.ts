import { PlayerId } from "../domain/types";

export class ConnectionManager {

  constructor(
    private connections = new Map<string, any>()
  ) {}

  save(id: PlayerId, connection: any) {
    this.connections.set(id, connection);
  }

  update(id: PlayerId, connection: any) {
    this.connections.set(id, connection);
  }

  remove(id: PlayerId) {
    this.connections.delete(id);
  }

  find(id: PlayerId) {
    return this.connections.get(id);
  }

  has(id: PlayerId) {
    return this.connections.has(id);
  }
}
