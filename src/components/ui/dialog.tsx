/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     Dialog 对话框组件                                      ║
 * ║  基于 Radix UI Dialog，shadcn/ui 风格                                      ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════════════
 *  基础组件导出
 * ════════════════════════════════════════════════════════════════════════════ */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/* ════════════════════════════════════════════════════════════════════════════
 *  遮罩层
 * ════════════════════════════════════════════════════════════════════════════ */

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/* ════════════════════════════════════════════════════════════════════════════
 *  内容区域
 * ════════════════════════════════════════════════════════════════════════════ */

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // 定位：固定居中
        "fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]",
        // 尺寸
        "w-full max-w-[800px] max-h-[90vh]",
        // 样式
        "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900",
        "border border-white/10 rounded-2xl shadow-2xl",
        // 动画
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        // 布局
        "flex flex-col overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/* ════════════════════════════════════════════════════════════════════════════
 *  头部
 * ════════════════════════════════════════════════════════════════════════════ */

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-between p-6 border-b border-white/10",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

/* ════════════════════════════════════════════════════════════════════════════
 *  底部
 * ════════════════════════════════════════════════════════════════════════════ */

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-6 border-t border-white/10 bg-black/20",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

/* ════════════════════════════════════════════════════════════════════════════
 *  标题
 * ════════════════════════════════════════════════════════════════════════════ */

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-bold text-white",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/* ════════════════════════════════════════════════════════════════════════════
 *  描述
 * ════════════════════════════════════════════════════════════════════════════ */

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/* ════════════════════════════════════════════════════════════════════════════
 *  导出
 * ════════════════════════════════════════════════════════════════════════════ */

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

