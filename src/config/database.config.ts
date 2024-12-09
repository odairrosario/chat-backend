const supportedDbTypes = ['mysql', 'postgres', 'mssql', 'mongodb'];

export type DatabaseType = (typeof supportedDbTypes)[number];

export const DATABASE_TYPE: DatabaseType =
  (process.env.DATABASE_TYPE as DatabaseType) || 'mongodb';

export const DATABASE_HOST: string = process.env.DATABASE_HOST || 'mongodb';
export const DATABASE_PORT: number = parseInt(
  process.env.DATABASE_PORT || '27017',
  10
);
export const DATABASE_NAME: string = process.env.DATABASE_NAME || 'chat-app';
export const DATABASE_USER: string = process.env.DATABASE_USER || '';
export const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD || '';

function validateDatabaseType(type: string): type is DatabaseType {
  return supportedDbTypes.includes(type);
}

export function validateDatabaseConfig(): boolean {
  return (
    validateDatabaseType(DATABASE_TYPE) &&
    !!DATABASE_HOST &&
    !!DATABASE_PORT &&
    !!DATABASE_NAME
  );
}
