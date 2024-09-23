export enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPER = 'Password has no upper case letter!',
  NO_LOWER = 'Password has no lower case letter!',
  NO_NUMBER = 'At leas one number is required!',
}

export interface CheckResult {
  valid: boolean;
  reasons: PasswordErrors[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];

    this.checkoForlenght(password, reasons);
    this.checkForLowerCase(password, reasons);
    this.checkForUpperCase(password, reasons);

    return {
      valid: reasons.length > 0 ? false : true,
      reasons,
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    const basicCheck = this.checkPassword(password);
    this.checkForNumber(password, basicCheck.reasons);

    return {
      valid: basicCheck.reasons.length > 0 ? false : true,
      reasons: basicCheck.reasons,
    };
  }

  private checkForlenght(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }

  private checkForNumber(password: string, reasons: PasswordErrors[]) {
    const hashNumber = /\d/;
    if (!hashNumber.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER);
    }
  }

  private checkForUpperCase(password: string, reasons: PasswordErrors[]) {
    if (password === password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPER);
    }
  }

  private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password === password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER);
    }
  }
}
