```typescript
export interface CharacterInfo {
  name: string;      // キャラクター名（日本語）
  series: string;    // 作品名（日本語）
  tags: string[];    // 検索用タグ（英語）
}

export interface RenameResult {
  originalName: string;  // 元のファイル名
  newName: string;      // 新しいファイル名
  character?: CharacterInfo;  // 検出されたキャラクター情報
}
```