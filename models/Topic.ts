/**
 * @file Defines Topic interface that reflects "tuit has a topic" relationship.
 */
import {Tuit} from "./Tuit";

export interface Topic {
    topic: string;
    tuit: Tuit;
}
