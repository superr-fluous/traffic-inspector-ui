export type AnyObject = Record<string | number | symbol, unknown>;

export type Defined<T> = Exclude<T, undefined | null>;
export type Undefined<T> = T | undefined;

export type Option<Val> = {
	value: Val;
	label: string;
};
