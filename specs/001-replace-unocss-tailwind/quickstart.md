# 快速指南：UnoCSS 迁移至 Tailwind CSS

**创建时间**: 2026-03-06
**功能分支**: 001-replace-unocss-tailwind

## 前置要求

- Node.js >= 22.12
- npm >= 10.x
- 备份当前 Git 状态

## 迁移步骤

### 步骤 1: 安装 Tailwind CSS 依赖

```bash
npm install -D tailwindcss @tailwindcss/vite
```

### 步骤 2: 移除 UnoCSS 依赖

```bash
npm uninstall unocss
```

### 步骤 3: 创建 tailwind.config.js

在项目根目录创建 `tailwind.config.js`:

```javascript
// tailwind.config.js
import plugin from 'tailwindcss/plugin'

export default {
  theme: {
    extend: {
      colors: {
        primary: '#3c40c6',
        success: 'rgb(82 196 26 / <alpha-value>)',
        warning: 'rgb(250 173 20 / <alpha-value>)',
        danger: 'rgb(250 85 85 / <alpha-value>)',
        info: 'rgb(144 147 153 / <alpha-value>)'
      },
      screens: {
        sm: '600px'
      }
    }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.navbar-shadow': {
          'box-shadow': '0 1px 4px rgb(0 21 41 / 8%)'
        }
      })
    })
  ]
}
```

### 步骤 4: 更新 vite.config.ts

打开 `vite.config.ts`:

**修改前**:
```typescript
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    // ...
  ]
})
```

**修改后**:
```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    // ...
  ]
})
```

### 步骤 5: 处理 uno.config.ts

有两个选择:

**选项 A: 删除文件** (推荐)
```bash
del uno.config.ts
```

**选项 B: 备份文件**
```bash
move uno.config.ts uno.config.ts.bak
```

### 步骤 6: 验证开发环境

```bash
npm run dev
```

检查点:
- [ ] 应用正常启动
- [ ] 控制台无 CSS 相关错误
- [ ] 页面样式正常显示
- [ ] 主题颜色正确应用
- [ ] 响应式布局正常工作

### 步骤 7: 验证生产构建

```bash
npm run build
```

检查点:
- [ ] 构建成功，无错误
- [ ] 构建产物中包含 CSS 文件
- [ ] CSS 文件大小合理

### 步骤 8: 预览生产构建

```bash
npm run preview
```

检查点:
- [ ] 预览页面样式正常
- [ ] 所有组件样式正确
- [ ] 自定义类 (如 navbar-shadow) 生效

## 问题排查

### 问题 1: 主题颜色不生效

**症状**: `text-primary`、`bg-success` 等类不显示正确颜色

**解决方案**:
1. 检查 `tailwind.config.js` 中 colors 配置是否正确
2. 确保使用正确的透明度语法
3. 重启开发服务器

### 问题 2: 断点行为异常

**症状**: 响应式布局在 600px 处未按预期切换

**解决方案**:
1. 检查 `screens.sm` 是否设置为 `600px`
2. 确认使用了正确的响应式前缀 `sm:`

### 问题 3: navbar-shadow 不生效

**症状**: 导航栏没有阴影效果

**解决方案**:
1. 检查 plugins 数组中是否添加了自定义工具类
2. 确认类名正确为 `navbar-shadow`
3. 重启开发服务器

### 问题 4: 构建后样式丢失

**症状**: 开发环境正常，生产构建后样式丢失

**解决方案**:
1. 检查 `tailwind.config.js` 是否在根目录
2. 确保 vite.config.ts 中添加了 tailwindcss 插件
3. 清理缓存后重新构建

## 常用命令

```bash
# 开发环境
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview

# 代码检查
npm run lint
```

## 兼容性参考

### UnoCSS → Tailwind CSS 类名对照

| UnoCSS 类名 | Tailwind CSS 类名 | 状态 |
|------------|------------------|------|
| text-primary | text-primary | ✅ 兼容 |
| bg-success | bg-success | ✅ 兼容 |
| sm:mt-4 | sm:mt-4 | ✅ 兼容 (需配置断点) |
| navbar-shadow | navbar-shadow | ✅ 兼容 (需配置插件) |
| i-carbon-home | 不适用 | ⚠️ 改用 AutoIcon |

### 不兼容的功能

| UnoCSS 功能 | Tailwind CSS | 替代方案 |
|------------|-------------|---------|
| presetAttributify | 不支持 | 使用标准 class 属性 |
| 动态规则 (bgimage-*) | 不支持 | 使用 SCSS 或内联样式 |
| transformerAttributifyJsx | 不支持 | Vue 项目不受影响 |

## 回滚步骤

如需回滚到 UnoCSS:

```bash
# 1. 撤销 Git 更改
git checkout .

# 2. 重新安装 UnoCSS
npm install -D unocss@66.5.10

# 3. 恢复 uno.config.ts
git checkout uno.config.ts

# 4. 恢复 vite.config.ts
git checkout vite.config.ts

# 5. 删除 tailwind.config.js
del tailwind.config.js
```

## 后续步骤

- [ ] 运行完整的视觉回归测试
- [ ] 更新项目文档
- [ ] 通知团队成员迁移完成
- [ ] 监控生产环境性能指标
