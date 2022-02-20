/**
 * @file Defines Tag interface that reflects "tuit has a tag" relationship.
 */
import {Tuit} from "./Tuit";

export interface Tag {
    tag: string;
    tuit: Tuit;
}
