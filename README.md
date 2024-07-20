# 光陵会Discord bot

![Node.js](https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js&style=popout)
![Discord.js](https://img.shields.io/badge/-Discord-7289DA.svg?logo=discord&style=popout)
![TypeScript](https://img.shields.io/badge/-TypeScript-44BDFF.svg?logo=typescript&style=popout)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3.svg?logo=eslint&style=popout)

## 概要

光陵会のDiscordサーバーで使用しているbotです。  
以下の機能があります。  

- スラッシュコマンド setup : 初期設定を促すメッセージを表示します
- 初期設定モーダル : 入力者にサーバーニックネームとロールを付与します

## 使用技術

- Node.js v20.15.1
- TypeScript 5.5.2
- Discord.js 14.x
- dotenv
- ESLint 9.6.0

## 環境構築手順

[Volta](https://volta.sh/) (Nodeバージョン管理ツール) をインストールする

```bash
# install Volta
$ curl https://get.volta.sh | bash
```

リポジトリのクローン

```bash
# Gitクローン
$ git clone git@github.com:Koryokai/koryokai-discord-bot.git
```

Nodeパッケージをインストールする

```bash
# プロジェクトルートに移動
$ cd [プロジェクトルート]

# npmインストール
$ npm install
```

botサーバを起動する

```bash
# TypeScriptのままテストする場合
$ npm run test

# JavaScriptビルド
$ npm run compile

# ビルドファイルの実行
$ npm run start
```

## 開発手順

1. mainブランチから、`feature/[xxx]`の形式で開発ブランチを切る
2. ファイルに変更を加える
3. リモートに開発ブランチをプッシュする
4. mainブランチに向けてPRを作成し、レビュアーを @t-a-yokohama / アサインを自分に設定する
5. @t-a-yokohama がマージするのを待つ(自分でマージしない)
