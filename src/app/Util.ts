export class StringUtils {
  public toUpperCase(str: string) {
    if (!str) {
      throw new Error('Invalid argument');
    }
    return toUpperCase(str);
  }
}

export function toUpperCase(str: string) {
  return str.toUpperCase();
}

export type StringInfo = {
  lowerCase: string;
  upperCase: string;
  charachters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function getStringInfo(arg: string): StringInfo {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    charachters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
}
