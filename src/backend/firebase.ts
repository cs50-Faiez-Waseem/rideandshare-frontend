import {
  child,
  getDatabase,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';

import app from './config';

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

class firebase {
  private db = null;
  constructor(db) {
    this.db = db;
  }
  public getPushKey(): string {
    return push(child(ref(this.db), 'posts')).key;
  }
  public set(
    path: string,
    data: object,
    callback: Function = (e) => console.log(e)
  ) {
    set(ref(this.db, path), data)
      .then(() => callback('saved'))
      .catch((err) => callback(err));
  }
  public push(
    path: string,
    data: object,
    callback: Function = (e) => console.log(e)
  ) {
    push(ref(this.db, path), data)
      .then(() => callback('saved'))
      .catch((err) => callback(err));
  }
  public update(
    path: string,
    data: object,
    callback: Function = (e) => console.log(e)
  ) {
    update(ref(this.db, path), data)
      .then(() => callback('updated'))
      .catch((err) => callback(err));
  }
  public remove(path: string, callback: Function = (e) => console.log(e)) {
    remove(ref(this.db, path))
      .then(() => callback('deleted'))
      .catch((err) => callback(err));
  }
  public getValueFromExactPath(path: string, callback: Function) {
    const pathref = ref(this.db);
    onValue(child(pathref, path), (snap) => callback(snap));
  }
  public onAdded(path: string, callback: Function) {
    const pathref = ref(this.db);
    onChildAdded(child(pathref, path), (snap) => {
      callback(snap);
    });
  }
  public onChanged(path: string, callback: Function) {
    const pathref = ref(this.db);
    onChildChanged(child(pathref, path), (snap) => {
      callback(snap);
    });
  }
  public onRemoved(path: string, callback: Function) {
    const pathref = ref(this.db);
    onChildRemoved(child(pathref, path), (snap) => {
      callback(snap);
    });
  }
}

export default new firebase(database);
