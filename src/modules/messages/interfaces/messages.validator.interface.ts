export interface MessagesValidatorInterface {
  validateUsers(fromUsername: string, toUsername: string): Promise<void>;
}
