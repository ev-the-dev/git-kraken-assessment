export interface BloggeurError {
  cause?: BloggeurError
  message: string
}

export class ValidationError implements BloggeurError {
  public constructor(
    public readonly message: string,
    public readonly cause?: BloggeurError
  ) {}
}
