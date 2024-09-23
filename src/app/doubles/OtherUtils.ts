import { v4 } from 'uuid';

export type StringInfo = {
  lowerCase: string;
  upperCase: string;
  charachters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCallBack = (args: string) => void;

export function toUpperCase(args: string) {
  return args.toUpperCase();
}

export function toLoweCaseWithId(args: string) {
  return args.toLowerCase() + v4();
}

export function calculateComplexity(stringInfo: StringInfo) {
  return Object.keys(stringInfo).length * stringInfo.length;
}

export function toUpperCaseWithCb(
  args: string,
  callBack: LoggerServiceCallBack
) {
  if (!args) {
    callBack('Invalid argument');
    return;
  }
  callBack(`Called function with ${args}`);
  return args.toUpperCase();
}

export class OtherStringUtils {
  public exernalService() {
    console.log('External service called');
  }

  public toUpperCase(args: string) {
    return args.toUpperCase();
  }

  public logString(arg: string) {
    console.log(arg);
  }
}
