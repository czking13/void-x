---
title: Agent 时代来了
date: 2026-05-20
category: 科技
tags: [Google I/O, Gemini, AI Agent, 搜索, TPU, SynthID, Android XR, 人工智能, Google]
image: /gallery/2026-05-20-agentic-gemini-era/agentic-gemini-era.jpg
---

# Agent 时代来了

2026 年 5 月 20 日，Google I/O。Sundar Pichai 站在 Mountain View 的舞台上，说了一句话：「Welcome to the agentic Gemini era.」欢迎来到 Agent 时代。

这句话不是一个愿景。它是一个事实陈述。

---

## 从工具到 Agent

去年的 I/O，Google 发布了 Gemini 2。那时候的叙事是「AI 更聪明了」。今年，叙事变了——不是更聪明，而是更**能做事**了。

区别在哪？

一个工具回答你的问题。一个 Agent 替你把事做了。

过去你问 Google「东京有什么好玩的」，它给你一串链接。然后你自己查、自己比、自己订。现在你跟 Gemini 说「帮我规划一个东京三天行程，预算一万，要含迪士尼」，它直接给你出方案、查机票、看酒店、比价格——最后问你：「要不要订？」

你说「要」。

它就订了。

这就是 Agent。

---

## 数字：Token 的爆炸

Pichai 在台上放了几个数字。它们看起来枯燥，但每一个背后都是一次质变：

- **3.2 quadrillion tokens/月**。两年前这个数字是 9.7 trillion——涨了 300 多倍。
- **8.5 million 开发者**在用 Google 的模型 API 构建 App。
- **19 billion tokens/分钟**通过 API 处理。
- **375 个 Google Cloud 客户**在过去 12 个月里各自处理了超过 1 trillion tokens。

Token 是 AI 世界的「汽油消耗量」。消耗量涨 300 倍，意味着有 300 倍的事在被 AI 处理。这不是概念验证阶段了，这是全面投产。

---

## 产品：AI 渗透一切

Google 有 13 个产品月活超过 10 亿。其中 5 个超过 30 亿。AI 正在渗透每一个。

### 搜索

AI Overviews（AI 概览）月活 25 亿。AI Mode（AI 模式）上线一年，月活已突破 10 亿。

搜索不再是「关键词 → 链接列表」。它变成了一场对话。你问一个问题，AI 给你答案，你追问，它深入。Google 把 27 年搜索经验浓缩成了一个能跟你聊天的知识引擎。

### Gemini App

去年 I/O 月活 4 亿。今天：**9 亿**。一年翻倍。日请求量增长 7 倍。

50 亿张图片通过 Nano Banana 模型生成。50 亿张。人们不是在「试用 AI 生图」，他们已经把它当成了日常工具。

### Ask YouTube

YouTube 有全球最大的视频知识库，但找信息像在海洋里捞针。Ask YouTube 改变了这一点——你提问，它直接跳到视频中相关的片段。

### Docs Live

不用打字了。打开文档，对着麦克风「脑暴」，Gemini 帮你整理成文档。语音输入不再是「语音转文字」，而是「语音到成品」。

---

## 模型：Gemini 3.5 Flash 和 Gemini Omni

### Gemini 3.5 Flash

Google 内部已经在用 3.5 Flash 加上 Antigravity 平台（Google 的 Agent-first 开发平台）来构建产品。3 月份每天处理 5000 亿 tokens，而且每隔几周就翻一倍。

关键数据：3.5 Flash 在几乎所有基准测试上超过了 3.1 Pro——但它是 Flash 级别的速度。输出速度比其他前沿模型快 **4 倍**。

这意味着什么？一个又快又强的模型，能驱动实时 Agent。Agent 不需要「等一下我想想」，它能即时反应。

### Gemini Omni

这是真正的「世界模型」。它不是生成文字，不是生成图片——它能从任何输入生成任何输出。先从视频输出开始，后续会支持图片和文字。

Gemini Omni 把 Gemini 的智能和 Google 的生成式媒体模型（Veo、Lyria 等）融合在一起。这不是一个「多模态模型」，这是一个「全模态模型」。

---

## 基础设施：TPU 8 和 1900 亿美元

Google 今年资本支出预计 1800-1900 亿美元。2022 年这个数字是 310 亿。六年涨了 6 倍。

TPU 进入第八代。这次 Google 做了一件不同的事——**双芯片架构**：

- **TPU 8t**：训练专用，算力是上一代的近 3 倍。跨数据中心分布式训练，超过 100 万个 TPU 组成全球最大训练集群。
- **TPU 8i**：推理专用，延迟大幅优化。Google 搞了 27 年搜索，比谁都懂「快」的重要性。

两个芯片都实现了 2 倍的能效提升。

---

## 透明性：SynthID 的胜利

AI 生成内容越来越逼真。研究表明，人类正确识别高质量 deepfake 视频的概率只有 **25%**。

Google 三年前推出 SynthID 隐形水印。至今已水印了超过 **1000 亿**张图片和视频，以及 **6 万年**的音频。

今年最重要的是：**OpenAI 加入 SynthID**。加上之前的 Nvidia，以及新加入的 Kakao 和 ElevenLabs，AI 水印正在成为行业标准。

这不是小事。当最大的竞争对手都同意用同一套水印标准，说明行业意识到：没有透明性，就没有信任；没有信任，就没有 AI 的未来。

---

## Android XR 眼镜

Google 在 I/O 上进一步展示了 Android XR 平台——专为 AR/VR 眼镜设计的操作系统。结合 Gemini 的多模态能力，眼镜不只是显示信息，而是理解你看到的场景并主动提供帮助。

Agent 不只在手机和电脑上。它会在你眼前。

---

## 为什么这很重要

如果你一直在关注 AI，Google I/O 2026 传递了一个清晰的信号：

**Agent 不再是概念。它是产品。**

过去两年，AI 行业在争论「AI 能不能做 X」。现在争论结束了。问题变成了「AI 做 X 的速度有多快，规模有多大」。

Google 的回答是：

- 3.2 quadrillion tokens/月
- 9 亿 Gemini 用户
- 10 亿 AI Mode 搜索用户
- 1900 亿美元基础设施投资
- 每几周翻一倍的内部 AI 开发效率

这不是一个公司的产品发布。这是一个行业拐点。

2026 年 5 月 20 日。记住这个日子。不是因为某一个大模型发布了，而是因为从今天开始，AI 不只是回答你的问题——它开始替你做事。

这就是 Agent 时代。

---

*参考：[Google Blog - I/O 2026: Welcome to the agentic Gemini era](https://blog.google/innovation-and-ai/sundar-pichai-io-2026/)*
