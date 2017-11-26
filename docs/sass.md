# sass文档

# 文档目录

```
├── 函数
│   ├── 字符串函数
│   │   ├── dev.env.js
│   │   └── test.env.js
│   ├── [数字函数](#数字函数)
│   │   ├── dev.env.js
│   │   ├── dev.env.js
│   │   ├── dev.env.js
│   │   ├── dev.env.js
│   │   ├── [abs()](#2.5 abs())
│   │   └── test.env.js
│   └── webpack.test.conf.js
├── test                     # 第三方不打包资源
├── favicon.ico              # favicon图标
├── index.ejs                # html模板
├── package.json             # package.json
├── README.md                # 项目描述文件
└── yarn.lock                # yarn
```

# 导航
1. [函数](#函数)
  * [字符串函数](#字符串函数)
  * [数字函数](#数字函数)
    * [abs()](#2.5 abs())

# 一、函数

## 1、字符串函数

### 1.1 

## 2、数字函数

### 2.5 abs()

> abs($number)，返回 $number 的绝对值。

例子:
```scss
.fs16 { 
  font-size: abs(-1.6rem);
}
.fs18 { 
  font-size: abs(1.8rem);
}

// 编译结果
.fs16 { 
  font-size: 1.6rem; 
}
.fs18 { 
  font-size: 1.8rem;
}
```



 
