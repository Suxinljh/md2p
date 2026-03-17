/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { toPng } from 'html-to-image';
import geminiSparkleAurora from './gemini_sparkle_aurora.svg?url';

export default function App() {
  // 状态：存储用户输入的 markdown 文本内容
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is a markdown to image converter.');

  // 引用：预览区域的 DOM 元素引用，用于 html-to-image 库截图导出
  const previewRef = useRef<HTMLDivElement>(null);

  /**
   * 处理下载图片按钮点击事件
   * 使用 html-to-image 库将预览区域转换为 PNG 图片并触发下载
   */
  const handleDownload = () => {
    if (previewRef.current) {
      toPng(previewRef.current, { cacheBust: true })
        .then((dataUrl) => {
          // 创建临时下载链接并触发点击
          const link = document.createElement('a');
          link.download = 'markdown-image.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('oops, something went wrong!', err);
        });
    }
  };

  return (
    <>
      {/* 自定义样式：滚动条和字体 */}
      <style>{`
        /* 自定义滚动条样式 */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4d4d8;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1aa;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d4d4d8 transparent;
        }

        /* 自定义字体栈：数字用 DIN，中文用 PingFang SC */
        .custom-font {
          font-family: 'MiSans', 'Microsoft YaHei', sans-serif;
        }
        b, strong {
          font-weight: 600;
        }
      `}</style>

      <div className="min-h-screen text-zinc-900 custom-font">
        {/* 页面标题区域 */}
        <header className="fixed top-0 left-0 right-0 z-20 p-8 pb-0">
          <h1 className="text-3xl font-bold text-zinc-900">Markdown to Image</h1>
          <p className="text-zinc-500">Convert your markdown text into a beautiful image.</p>
        </header>

        {/* 浮动下载按钮：固定在右上角、最高层级（z-50确保在最上层） */}
        <button
          onClick={handleDownload}
          className="fixed top-8 right-8 z-50 px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors font-medium shadow-md"
        >
          Download
        </button>

        {/* 左侧输入区域容器：固定定位、从 header 下方开始、全屏高度、宽度为 50%（不含 padding）、右侧 2em 内边距 */}
        <div className="fixed left-0 top-24 h-[calc(100vh-6rem)] w-1/2 z-10 flex flex-col pr-[2em]">
          <textarea
            // 输入框：填充容器、全屏高度、带边框和阴影的白色背景、禁用手动调整大小、2em 外边距、现代滚动条
            className="w-full h-full p-8 m-[2em] border border-zinc-200 rounded-xl bg-white focus:ring-2 focus:ring-zinc-900 outline-none shadow-sm resize-none custom-scrollbar"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
          />
        </div>

        {/* 右侧预览区域：绝对定位、从50%位置开始、从 header 下方开始、固定宽度（1000px）、高度自适应内容、可随页面滚动 */}
        <div className="absolute left-1/2 mt-32 w-[1000px] px-8 pb-16">
          <div
            ref={previewRef}
            // 预览卡片：固定宽度（1000px）、内边距、2em外边距、边框、圆角、白色背景、阴影
            className="p-16 border border-zinc-200 rounded-xl bg-white shadow-sm w-[1000px] flex flex-col"
          >
            {/* Markdown 内容样式：prose（基础排版）+ prose-zinc（zinc 色系）+ max-w-none（无最大宽度限制）+ leading-loose（行高宽松）+ text-[32px]（字号32像素）+ 自定义元素样式（分割线、列表等）+ 自定义字体 */}
            <div className="prose prose-zinc max-w-none leading-loose text-[32px] [&_hr]:my-4 [&_hr]:border-[#dedede] [&_ul]:pl-10 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:list-[inherit] custom-font">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>

            {/* 底部签名：显示 Gemini logo 和来源文字 */}
            <div className="flex items-center gap-2 mt-8 text-zinc-400 text-sm">
              <img src={geminiSparkleAurora} alt="Gemini" className="w-5 h-5" />
              <span>来自Suxin的Gemini对话</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
