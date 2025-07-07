# Monorepo でも最強のフォーマットを実施したい

## biome 環境構築

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

こうすると、biome がちゃんと `frontend/node_modules` 配下のパッケージを認識してフォーマットしてくれるみたいです。

[この ISSUE](https://github.com/biomejs/biome-vscode/issues/337) が参考になりますが、OS によって `cli-darwin-arm64` は変わるみたいです。

### 3. リポジトリ直下にシンボリックリンクを配置

```shell
ln -s frontend/biome.json biome.json
```

これで、このプロジェクトの `format on save` が、リポジトリ直下で読み取れるようになりました！
もちろん `frontend` で VSCode を開いてもこれは動作します。

## leftHook 環境構築

### 1. leftHook のインストール

```shell
cd frontend
npm i -D lefthook
```

この時点で、`lefthook.yml` が生成される。しかもリポジトリ直下に。
→ git との相性が良く、この後の動作でも config 関連が `.git` 配下に溜まってくれたり、良心的。

### 2. `frontend/package.json` を更新

スクリプトに以下を追記

```json
"scripts": {
  "prepare": "lefthook install"
}
```

チーム開発でも、 `npm ci` だけで prepare 内のスクリプトが実行されて、いいですね。

### 3. あとはよしなに lefthook.yml を書き換えるだけ

```yml
pre-push:
  parallel: true
  commands:
    tsc:
      root: frontend/
      run: npx tsc
pre-commit:
  parallel: true
  commands:
    format:
      root: frontend/
      glob: "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
      stage_fixed: true
```

`root` の項目で、PJ のディレクトリを指定してあげれば、よしなに実行してくれる。素晴らしいですね。
