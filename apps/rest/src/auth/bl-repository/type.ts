export interface BanToken {
  readonly banToken: (token: string) => Promise<void>;
}

export interface IsTokenBanned {
  readonly isTokenBanned: (token: string) => Promise<boolean>;
}

export type BLRepository = BanToken & IsTokenBanned;
