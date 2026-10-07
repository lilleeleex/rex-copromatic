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

La fonction Array.includes n'accepte que le type des éléments du tableau. 
  Double et Absolue viennent de AddAssembleeResolutionMajoriteEnum, alors que majorite est une ResolutionMajorite, qui ajoute aussi "trois-quarts (ASL)".

  majorite: ResolutionMajorite, // AddAssembleeResolutionMajoriteEnum +   TroisQuartsAsl: "trois-quarts (ASL)",
  estBelge: boolean
): (typeof RevotableEnum)[keyof typeof RevotableEnum] {
  const revotable =
    [ResolutionMajoriteEnum.Double, ResolutionMajoriteEnum.Absolue].includes(
      majorite
    ) && !estBelge;
  const majoritesRevotables: readonly ResolutionMajorite[] = [
    ResolutionMajoriteEnum.Double,
    ResolutionMajoriteEnum.Absolue,
  ];
  const revotable = majoritesRevotables.includes(majorite) && !estBelge;
  return revotable ? RevotableEnum.OUI : RevotableEnum.NON;

OU

export function estRevotable(
  majorite: ResolutionMajorite,
  estBelge: boolean
): (typeof RevotableEnum)[keyof typeof RevotableEnum] {
  const revotable =
    [
      ResolutionMajoriteEnum.Double,
      ResolutionMajoriteEnum.Absolue,
      ResolutionMajoriteEnum.TroisQuartsAsl,
    ].includes(majorite) && !estBelge;

  return revotable ? RevotableEnum.OUI : RevotableEnum.NON;
}
