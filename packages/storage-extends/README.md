# storage extend 扩展 原生 Storage 添加过期时间

# 安装
此为ts项目，如需js版本，可自行转成js使用 [https://www.typescriptlang.org/play](https://www.typescriptlang.org/play)
  - 复制整个文件到项目 `packages/` 目录下
  - 项目根目录添加 `pnpm-workspace.yaml` 文件，添加一下内容
  ```yaml
    packages:
      # all packages in direct subdirs of packages/
      - 'packages/*'
  ```
  - `package.json` 添加以下内容：
  ```json
  {
    "workspaces": [
      "packages/*"
    ],
    "dependencies": {
      "storage-extends": "workspace:~",
    }
  }
  ```
  - 重新安装整个项目：
  ```
  pnpm install
  ```
  - `main.ts` 导入
  ```js
  import 'storage-extends';
  ```


# 使用
```js
  localStorage.setExpireItem('key', 'val', 123);
  localStorage.getExpireItem('key');
```
