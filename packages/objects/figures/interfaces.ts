import type { CarobjOption } from "../carobj";
import type { Bordered, Fillable } from "../interfaces";

/**
 * Figure options.
 * @see CarobjOption
 * @see Bordered
 * @see Fillable
 */
export type FigureOption = CarobjOption & Partial<Bordered> & Fillable;
