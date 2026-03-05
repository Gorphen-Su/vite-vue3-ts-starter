# vite-ts-starter


[![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/Gorphen-Su)
[![License](https://img.shields.io/github/license/pdsuwwz/vite-ts-starter?color=blue)](https://github.com/Gorphen-Su/vite-vue3-ts-starter/blob/main/LICENSE)

🐬 A Starter template built on Vite 7.x + Vue 3.x + Element Plus 2.x + TypeScript + Husky + lint-staged.

一个开箱即用，适合快速开发 Vue3 + Vite7 + TS 中小型 B 端后台管理系统的原型模板项目框架，持续更新最新技术栈 💪


## 🎉 Features

* 支持 __Vite 7 + Vue 3 + TypeScript__
* UI 框架: __Element Plus 2.x__
* 状态管理: Pinia
* 代码规范化检测: __Husky + lint-staged__
* 单元测试框架: __Vitest__
* 内置 __ESlint__ 和 __Stylelint__, 可在此基础上扩展你想要的 Lint 配置规范
* 内置封装了一个**可能比较好用的** Axios , 需要时配合 Pinia Actions 一起食用
* 封装了 \<IconFont \/> 组件, 可直接使用 IconFont 图标
* 内置全局 **$ModalDialog** 插件, 支持使用 service 式地动态调用此插件来显示任意组件
* 内置 i18n, 支持到 VueRouter 路由级别切换语言，可编写国际化配置文件及扩展其他语言
* 路由鉴权已帮你封装好，同时配合 Nprogress, 只需要修改 permission.ts 文件即可
* 自带一个模块化的组件开发环境，可按照 modules 目录解耦页面组件、路由组件、样式等文件
* 高度封装但不失灵活，内部抽象出了一个完整的业务流程供你参考，涉及三个核心页面：登录、列表和明细
* 节省你配置的时间，因此该项目的**轻量化**致使你只需要专心编写自己的业务代码即可


## 前置条件

* Vue 3.x
* Node >= 22.12.x
* Pnpm 9.x | npm 11.6.x
* **VS Code 插件 `dbaeumer.vscode-eslint` >= v3.0.5 (pre-release)**



## 安装和运行

* 安装依赖

```bash
pnpm i
```

* 本地开发

```bash
pnpm dev
```

## 单元测试

* 执行单测

```bash
pnpm test
```

* 执行覆盖率测试

```bash
pnpm test:coverage
```

## 🌍 国际化 i18n 设置

本项目支持多语言设置，默认语言为 `English`.

### 默认语言配置


默认语言通过 [`defaultLanguageLocale`](src/locales/index.ts#L43) 常量设置。要更改默认语言，只需修改此常量的值：

```ts
export const defaultLanguageLocale = 'en'
```

### 扩展支持的语言


项目当前支持以下语言，详见代码[src/locales/index.ts](src/locales/index.ts#L13):

```ts
export const localesMapping = [
  {
    localeCode: 'zh-cn',
    localeName: '简体中文',
    localeLang: {...}
  },
  {
    localeCode: 'en',
    localeName: 'English',
    localeLang: {...}
  }
]
```

要添加新的语言支持:

  * 在 [`localesMapping`](src/locales/index.ts#L13) 数组中添加新的语言对象
  * 在 [`src/locales/lang/`](src/locales/lang/) 目录下创建对应的语言文件（如 de.ts 为德语）

    ```
    ./lang
    ├── en.ts
    └── zh_cn.ts
    ```
  * 导入并合并 `Element Plus` 语言包和自定义语言文件，确保 UI 组件和自定义内容均被本地化


## 💡 提示

* 若 Husky 未生效，可能是由于未完成初始化，尝试执行以下命令进行初始化:

```bash
pnpm run prepare
```