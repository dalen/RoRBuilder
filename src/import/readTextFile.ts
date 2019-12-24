import { promises as fs } from 'fs';
import iconv from 'iconv-lite';

// Read one of the language .txt files into a
export const readTextFile = async (
  filename: string,
  encoding: string,
): Promise<Map<number, string>> => {
  return new Map(
    iconv
      .decode(
        await fs.readFile(filename, {
          flag: 'r',
        }),
        encoding,
      )
      .split('\r\n')
      .map((line, index) => [
        index,
        ...Array.from(
          line.trim().matchAll(/([A-Z_\d]+)\s+([^\^]*)(\^n)?/),
        ).flat(1),
      ])
      .filter(line => line.length > 1) // Skip lines that didn't match regexp
      .map((line): [number, string] => [Number(line[0]), line[3].toString()]),
  );
};
