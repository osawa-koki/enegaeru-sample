# エネがえるサンプル

🍇🍇🍇 [エネがえるサンプル](https://qiita.com/ysakurada/items/b7d255ed8c5b6027530d)APIを利用したサンプルプログラム。  
転職活動用です。  

## 実行方法

`.env.local.example`ファイルを`.env.local`にリネームし、各変数に値を設定してください。  

```shell
# モジュールのインストール
yarn

# デバグ実行
yarn dev

# ビルド
yarn build
```

Dockerファイルでのビルドも可能です。  

```shell
# Dockerコンテナビルド
docker build -t enegaeru-sample .

# コンテナ実行
docker run -it --rm -v $(pwd)/dist:/app/dist enegaeru-sample
```

## With GH Actions

作成した`.env.local`ファイルをリポジトリのSecretsに登録してください。  
名前は`ENV_LOCAL`としてください。  
GH Actionsでmainブランチにpushされたら自動でビルドされ、GH pagesにデプロイされます。  

## 参考文献

- [エネがえるサンプル](https://qiita.com/ysakurada/items/b7d255ed8c5b6027530d)
- [APIドキュメント](https://www-v4.enegaeru.com/apidoc/api-general.html)
