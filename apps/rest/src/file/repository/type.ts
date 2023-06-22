import * as Option from 'fp-ts/Option';
import * as FileRecord from '../file-record';

export type FileRepository = {
  readonly createFileRecord: (record: FileRecord.FileRecord) => Promise<void>;
  readonly getFileRecord: (
    fileId: string
  ) => Promise<Option.Option<FileRecord.FileRecord>>;
  readonly getFileRecords: () => Promise<readonly FileRecord.FileRecord[]>;
  readonly deleteFileRecord: (fileId: string) => Promise<void>;
  readonly updateFileRecord: (record: FileRecord.FileRecord) => Promise<void>;
};
