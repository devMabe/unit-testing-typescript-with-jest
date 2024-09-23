export type StringInfo = {
  lowerCase: string;
  upperCase: string;
  charachters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCallBack = (args: string) => void;

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
  public toUpperCase(args: string) {
    return args.toUpperCase();
  }

  public logString(arg: string) {
    console.log(arg);
  }
}
