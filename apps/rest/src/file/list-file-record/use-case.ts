import { FileRepository } from '../repository/instance';
import { FileRecord } from '../file-record';

export async function listFileRecord(
  data: Readonly<{
    page: number;
    listSize: number;
  }>
): Promise<{
  list: readonly FileRecord[];
  page: number;
  listSize: number;
}> {
  const list = await FileRepository.getFileRecords();
  const start = data.page - 1 * data.listSize;
  const end = start + data.listSize;
  return {
    list: list.slice(start, end),
    page: data.page,
    listSize: data.listSize,
  };
}
