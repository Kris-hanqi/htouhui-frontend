# sass文档

# 文档目录

```
├── 函数
│   ├── 字符串函数
│   │   ├── dev.env.js
│   │   └── test.env.js
│   ├── 数字函数
│   │   ├── percentage()
│   │   ├── round()
│   │   ├── ceil()
│   │   ├── floor()
│   │   ├── abs()
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
* [函数](#函数)
   * [字符串函数](#字符串函数)
   * [数字函数](#数字函数)
      * [percentage](#percentage)
      * [round](#round)
      * [ceil](#ceil)
      * [floor](#floor)
      * [abs](#abs)

# 函数

## 字符串函数

## 数字函数

### percentage

> percentage($number) 将一个不带单位的数值转成百分比。

例子:
```scss
.box { 
  width: percentage(.5);
}
.box2 { 
  width: percentage(.1rem / .3rem);
}

// 编译结果
.box { 
  width: 50%; 
}
.box2 { 
  width: 33.33333%; 
}

```

### round

> round($number) 将$number 四舍五入为整数，$number可带单位。

```scss
.xs-row { 
  width: round(33.33333333333333px);
}

// 编译结果
.xs-row { 
  width: 33px; 
}
```

### ceil

> ceil($number) 大于 $number ，向上取整。

例子:
```scss
.fs14 { 
  font-size: ceil(13.1px);
}
.fs16 { 
  font-size: ceil(15.9px);
}

// 编译结果
.fs14 { 
  font-size: 14px; 
}
.fs16 { 
  font-size: 16px; 
}
```

### floor

> 与 ceil()相反，floor($number) 去除 $number 小数，向下取整。

例子:
```scss
.fs14 { 
  font-size: floor(14.1px);
}
.fs16 { 
  font-size: floor(16.9px);
}

// 编译结果
.fs14 {
  font-size: 14px; 
}
.fs16 { 
  font-size: 16px; 
}
```

### abs

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



 
