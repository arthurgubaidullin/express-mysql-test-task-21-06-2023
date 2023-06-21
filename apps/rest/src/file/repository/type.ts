import * as Option from 'fp-ts/Option';
import * as FileRecord from '../file-record';

export type FileRepository = {
  readonly createFileRecord: (record: FileRecord.FileRecord) => void;
  readonly getFileRecord: (
    fileId: string
  ) => Option.Option<FileRecord.FileRecord>;
  readonly getFileRecords: () => readonly FileRecord.FileRecord[];
  readonly deleteFileRecord: (fileId: string) => void;
  readonly updateFileRecord: (record: FileRecord.FileRecord) => void;
};
