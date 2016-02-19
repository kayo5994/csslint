[![npm version](https://img.shields.io/npm/v/csslint.svg)](https://www.npmjs.com/package/csslint-qmui)
[![Build Status](https://img.shields.io/travis/CSSLint/csslint/master.svg)](https://travis-ci.org/CSSLint/csslint)
[![Dependency Status](https://img.shields.io/david/CSSLint/csslint.svg)](https://david-dm.org/CSSLint/csslint)
[![devDependency Status](https://img.shields.io/david/dev/CSSLint/csslint.svg)](https://david-dm.org/CSSLint/csslint#info=devDependencies)

# CSSLint-QMUI

基于 [CSSLint](https://github.com/CSSLint/csslint) 增加了适用于 QMUI 规范的检测规则，用于快速检测新人常见的，不符合 QMUI 命名规范的 Class-name 命名问题。

## Class-name Formats（Class-name 格式检测）

检测条件包括以下两条：

1. Class-name 只能由 a-z, A-Z, 1-9（不能为0）和下划线（-）这些字符构成 
1. Class-name 中至少包括一个下划线（-）

配合 CSSLint 原有的检测条件以及 W3C 的规范，最终得出合符条件的 Class-name，例如有以下样式表：

```css
.test {
  background: red;
}
.test-qmui {
  background: blue;
}
.test_qmui {
  background: yellow;
}
.zero_qmui0 {
  background: yellow;
}
```

检测后得出如下结果：
```
csslint: There are 3 problems in /Users/Kayo/Web/main.css.

main.css
1: warning at line 1, col 1
Class-name should consists of two parts at least.
.test {

main.css
2: warning at line 4, col 1
Naming format does not follow the norm QMUI(Just a-z, A-Z, 1-9 and _).
.test-qmui {

main.css
3: warning at line 10, col 1
Naming format does not follow the norm QMUI(Just a-z, A-Z, 1-9 and _).
.zero_qmui0 {
```

**适应的常见问题：**
* 使用中划线（-）作为连接符
* Class-name 只由一个部分组成。（说明：为了避免 Class-name 过于简单造成 CSS 污染，QMUI 规范中规定 Class-name 至少应由两部分组成，每个部分是一个单词或者单词的缩写或者结合数字，连接符使用下划线（_））

## Miss Root Class（缺少 Root Class）

检测一个 Class-name 是否有写 Root Class，例如有如下样式表：

```css
.test_list {
    background: yellow;
}
.test_list_item {
    background: yellow;
}
.test_head_title {
    font-size: 20px;
}
```

检测后得出如下结果：
```
csslint: There is 1 problem in /Users/Kayo/Web/main.css.

main.css
main.css
1: warning at line 7, col 1
Class-name .test_head_title shouldn't exist unless you've already set a class-name .test_head.
.test_head_title {
```

`.test_list_item` 因为已经正确地同时定义了 Root Class `.test_list`，因此没有报错。而`.test_head_title`则因为缺少 Root Class 而报 Warning 了。

**适应的常见问题：**
* 没有正确理解 Root Class 与 CSS 命名空间的概念，如直接定义子 Class，而没有先定义 Root Class，再一步步定义子 Class
* 创建扩展 Class-name 时没有先定义基类
