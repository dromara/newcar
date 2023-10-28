import type { Bordered, Fillable } from "../../interfaces";
import type { CarobjOption } from "../carobj";

/**
 * Figure options.
 * @see CarobjOption
 * @see Bordered
 * @see Fillable
 */
export type FigureOption = CarobjOption & Partial<Bordered> & Fillable;
