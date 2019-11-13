export type RenownAbility = {
  name: string;
  note: string;
  cost: number;
};

export type RenownCategory = {
  name: string;
  description: string;
  short_name: string;
  icon: string;
  levels: RenownAbility[];
};
