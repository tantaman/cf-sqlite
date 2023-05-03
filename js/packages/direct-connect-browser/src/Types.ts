import { UpdateType } from "@vlcn.io/xplat-api";

export type Endpoints = {
  createOrMigrate: URL;
  getChanges: URL;
  applyChanges: URL;
  establishOutboundStream: URL;
  getLastSeen: URL;
};

export type ToWorkerMsg = LocalDBChangedMsg | StartSyncMsg | StopSyncMsg;
export type FromWorkerMsg = SyncedRemoteMsg;

export type LocalDBChangedMsg = {
  _tag: "LocalDBChanged";
  dbid: DBID;
};

export type StartSyncMsg = {
  _tag: "StartSync";
  dbid: DBID;
  endpoints: Endpoints;
};

export type StopSyncMsg = {
  _tag: "StopSync";
  dbid: DBID;
};

export type SyncedRemoteMsg = {
  _tag: "SyncedRemote";
  dbid: DBID;
  collectedChanges: [UpdateType, string, bigint][];
};

export type DBID = string & {
  readonly DBID: unique symbol; // this is the phantom type
};

export function newDbid() {
  return crypto.randomUUID().replaceAll("-", "") as DBID;
}