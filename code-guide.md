# CSS语法指南

具体规则可查看[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard/blob/master/index.js)

* at-rule-empty-line-before // 每个规则开始之前必须添加空行
* at-rule-name-case // 规则命名为小写
* at-rule-name-space-after // 规则名称后需要一个空格
* at-rule-semicolon-newline-after // 分号后有一个换行符

## 块

* block-closing-brace-empty-line-before // 在块的关闭括号之前不允许空行
* block-closing-brace-newline-after // 在大括号之后必须总是有一个换行符
* block-closing-brace-newline-before // 
* block-closing-brace-space-before // 
* block-opening-brace-newline-after //
* block-opening-brace-space-after // 
* block-opening-brace-space-before //

## 颜色

* color-hex-case // 十六进制颜色为小写
* color-hex-length // 十六进制颜色为短符号

## 列表值

* value-list-comma-newline-after // 必须在多行列表值得逗号后唤醒
```scss
a { background-size: 0, 0; }

a { background-size: 0,0; }

a { background-size: 0,
      0; }
```
* value-list-comma-space-after // 单行值列表逗号后必须有一个空格
* value-list-comma-space-before // 
* value-list-max-empty-lines // 列表中相邻空行的数量为0

## SCSS

### 变量



