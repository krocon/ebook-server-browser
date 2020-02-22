import {ThumbsDimIf} from './thumbs-dim.if';

export interface SectionIf {
  label: string;
  bookExtensions: string[];
  baseDir: string;
  thumbsDims: ThumbsDimIf[];
  dimIndex: number;
  initialFilter: string;
}
