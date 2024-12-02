export interface CharacterData {
  series: string;
  character: string;
  tags: string[];
}

export interface RenameResult {
  originalName: string;
  newName: string;
  character?: CharacterData;
}