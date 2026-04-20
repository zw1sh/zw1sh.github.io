---
title: "如何安装和卸载nvm-windows、nodejs"
description: "如何安装和卸载nvm-windows、nodejs"
image: "@assets/blog/blog_post.jpg"
publishDate: "2026-04-20"
tags: ["Introduction", "Web Development"]
---


## 安装
#### 步骤：安装 nvm-windows（多版本管理，最佳实践）

1. **卸载已有的 Node.js**（避免冲突）：
   - 控制面板 → 程序和功能 → 找到 Node.js → 卸载。
   - 删除残留文件夹（如 `C:\Program Files\nodejs`）。

2. **下载并安装 nvm-windows**：
   - 打开浏览器访问：https://github.com/coreybutler/nvm-windows/releases
   - 下载最新版本的 **nvm-setup.zip**（推荐使用安装程序）。
   - 解压后运行 **nvm-setup.exe**，按向导安装（默认路径即可）。

3. **以管理员身份打开命令提示符（CMD）或 PowerShell**，验证安装：
   ```bash
   nvm --version
   ```
   如果显示版本号，则安装成功。


4. **执行安装命令**：
   ```bash
   nvm install lts
   ```

   这会自动下载并安装当前最新的 **Node.js LTS 版本**（2026 年通常是 22.x 或 24.x 系列）。

5. **安装完成后切换到该版本**：
   ```bash
   nvm use lts
   ```

6. **设置这个 LTS 版本为默认**（以后新开终端自动使用）：
   ```bash
   nvm alias default lts
   ```

7. **验证是否成功**：
   ```bash
   node -v
   npm -v
   ```

   你应该看到类似 `v22.xx.x`（或更高 LTS）和对应的 npm 版本。

### 其他常用命令（以后会用到）

- 查看已安装的 Node 版本：  
  `nvm list` 或 `nvm ls`

- 查看可安装的版本列表：  
  `nvm list available`

- 安装特定版本（例如 Node 20）：  
  `nvm install 20`

- 安装最新非 LTS 版本（Current）：  
  `nvm install latest`

- 切换版本：  
  `nvm use 20`

### 2. 验证 npm 是否安装成功

安装 Node.js 后，自动带有 npm。在 CMD 或 PowerShell 中运行：

```bash
node -v
npm -v
```

看到版本号（如 node v20.xx.x 和 npm 10.xx.x）即成功。

### 3. npm 基础配置（加速 + 常用设置）

在中国使用 npm 时，下载速度可能较慢，建议切换国内镜像源：

```bash
# 设置淘宝镜像（推荐，速度快）
npm config set registry https://registry.npmmirror.com

# 查看当前镜像
npm config get registry

# 如果想恢复官方源
npm config set registry https://registry.npmjs.org/
```

**其他实用配置**（可选）：
```bash
# 设置全局安装路径（避免权限问题）
npm config set prefix "D:\Develop\node-global"
npm config set cache "D:\Develop\node-cache"

# 添加到系统环境变量 PATH（如果没自动添加）
```

### 4. npm 常用命令（Astro 项目必备）

进入你的 AstroWind 项目文件夹后，使用以下命令：

```bash
# 安装项目依赖（第一次运行项目必须执行）
npm install

# 启动本地开发服务器（实时预览）
npm run dev

# 构建静态站点（部署前必须执行）
npm run build

# 清除缓存（构建出错时使用）
npm cache clean --force

# 更新依赖
npm update

# 安装特定包（例如添加 Tailwind 插件）
npm install some-package
npm install some-package --save-dev   # 开发依赖
```

**项目初始化命令**（如果你想新建项目）：
```bash
npm create astro@latest my-personal-blog -- --template arthelokyo/astrowind
```

### 5. Windows 常见问题解决

- **权限错误**（无法安装包）：以**管理员身份**运行 CMD/PowerShell。
- **命令找不到**：重启终端，或检查环境变量（Win + S 搜索“环境变量” → 系统变量 → Path 中确保有 Node.js 路径）。
- **杀毒软件拦截**：部分杀毒软件会误报 npm，建议临时关闭或添加白名单。
- **PowerShell 执行策略问题**：运行 `Set-ExecutionPolicy RemoteSigned`（管理员权限）。
- **构建 Astro 时出错**：确保 Node 版本 ≥ 18，推荐使用 LTS 版本。


## 卸载

以下是在 **Windows** 系统上**彻底卸载 Node.js 和 nvm-windows** 的完整、干净步骤（推荐按顺序操作，避免残留导致后续重新安装失败）。

### 第一步：卸载所有已安装的 Node.js 版本（使用 nvm）

以**管理员身份**打开 **命令提示符（CMD）** 或 **PowerShell**：

```bash
# 1. 查看当前已安装的所有 Node 版本
nvm list

# 2. 逐个卸载（把下面版本号替换成你 nvm list 显示的版本，例如 20、22 等）
nvm uninstall 20
nvm uninstall 22
# ... 重复直到卸载完所有版本
```

如果提示版本不存在或报错，直接跳到下一步。

### 第二步：卸载 nvm-windows 本身（最简单方式）

1. 按 `Win + R`，输入以下路径后回车打开 nvm 安装目录：
   ```
   %APPDATA%\nvm
   ```
   （通常是 `C:\Users\你的用户名\AppData\Roaming\nvm`）

2. 在这个文件夹中找到 **unins000.exe**（或类似 unins 开头的卸载程序）。

3. **双击运行 unins000.exe**，按照提示完成卸载（它会自动移除 nvm 和残留的 Node 版本）。

如果文件夹里没有 unins000.exe，则进行手动删除（见下面彻底清理部分）。

### 第三步：彻底清理残留文件和文件夹

删除以下目录（用文件资源管理器删除，如果提示权限不足，用管理员权限打开资源管理器或右键 → 以管理员身份运行）：

- `C:\Users\你的用户名\AppData\Roaming\nvm` （整个 nvm 文件夹）
- `C:\Users\你的用户名\AppData\Roaming\npm`
- `C:\Users\你的用户名\AppData\Roaming\npm-cache`
- `C:\Program Files\nodejs` （如果存在）
- `C:\Program Files (x86)\nodejs` （如果存在）

另外删除可能的配置文件：
- `C:\Users\你的用户名\.npmrc`
- `C:\Users\你的用户名\AppData\Local\Temp\npm-*` （临时文件夹里的 npm 缓存）

### 第四步：清理环境变量（非常重要！）

1. 右键 **此电脑**（或 **这台电脑**） → 属性 → 高级系统设置 → 环境变量。

2. 在 **用户变量** 和 **系统变量** 中分别找到 **Path**：
   - 点击编辑
   - 删除所有包含以下内容的条目：
     - `nodejs`
     - `npm`
     - `nvm`
     - `%APPDATA%\nvm`
     - `%APPDATA%\npm`

3. 删除完毕后点击确定，关闭所有窗口。

### 第五步：重启电脑并验证

- 重启电脑（必须重启，否则环境变量不会完全刷新）。
- 重启后再次以管理员身份打开 CMD，输入以下命令检查：
  ```bash
  node -v
  npm -v
  nvm -v
  ```
  如果都提示“不是内部或外部命令”，说明已经彻底卸载成功。

### 额外彻底清理（如果还残留）

- 用 **Everything**（搜索工具）或文件资源管理器搜索 `node`、`npm`、`nvm`，手动删除残留文件（小心不要删错系统文件）。
- 清空 npm 缓存（如果还能执行）：`npm cache clean --force`

### 卸载完成后想重新安装干净版本

可以直接重新安装 nvm-windows（推荐）：
- 去 https://github.com/coreybutler/nvm-windows/releases 下载最新的 `nvm-setup.exe`
- 安装后运行：
  ```bash
  nvm install lts
  nvm use lts
  nvm alias default lts
  ```

这样就能获得一个干净的环境，适合继续安装 **AstroWind** 项目。

**注意事项**：
- 整个过程建议**以管理员权限**操作，避免权限问题。
- 如果你是第一次彻底清理，建议备份重要项目后再操作。
- 操作后重启是关键步骤。
