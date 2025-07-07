# Monorepo でも biome のフォーマットを実施したい

## 解決方法（サマリ）

### 1. PJ フォルダで `biome` を普通にインストール

```shell
cd frontend
npm i -D @biomejs/biome
```

自分は `1.9.4` のバージョンで検証しました。特に問題なかったです。

### 2. `/.vscode/settings.json` を以下のようにする

```json
{
"editor.formatOnSave": true,
"editor.defaultFormatter": "biomejs.biome",
"biome.lsp.bin": "frontend/node_modules/@biomejs/cli-darwin-arm64/biome"
}
```

こうすると、biomeがちゃんと `frontend/node_modules` 配下のパッケージを認識してフォーマットしてくれるみたいです。

[このISSUE](https://github.com/biomejs/biome-vscode/issues/337) が参考になりますが、OSによって `cli-darwin-arm64` は変わるみたいです。

### 3. リポジトリ直下にシンボリックリンクを配置

```shell
ln -s frontend/biome.json biome.json
```

これで、このプロジェクトの `format on save` が、リポジトリ直下で読み取れるようになりました！
もちろん `frontend` でVSCodeを開いてもこれは動作します。
