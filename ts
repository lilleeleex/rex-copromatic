export const RevotableEnum = {
  NON: 0,
  OUI: 1,
} as const;

{ revotable: (typeof RevotableEnum)[keyof typeof RevotableEnum] }

Plus simple pour caster meme si on a un autre type en aval comme 
export declare enum AddAssembleeResolutionRevotableEnum {
    NUMBER_0 = 0,
    NUMBER_1 = 1
}
