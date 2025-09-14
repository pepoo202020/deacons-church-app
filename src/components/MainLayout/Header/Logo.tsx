import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  t: (key: string, options?: any) => string | object;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "header" | "footer" | "sidebar" | "mobile";
  showTitle?: boolean;
  showSubtitle?: boolean;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  subtitleKey?: string;
}

const Logo = ({
  t,
  size = "md",
  variant = "default",
  showTitle = true,
  showSubtitle = false,
  className,
  imageClassName,
  titleClassName,
  subtitleKey = "subtitle",
}: LogoProps) => {
  // Enhanced size configurations
  const sizeConfig = {
    xs: {
      image: { width: 24, height: 24 },
      text: "text-xs",
      subtitle: "text-xs",
      gap: "gap-1",
    },
    sm: {
      image: { width: 32, height: 32 },
      text: "text-sm",
      subtitle: "text-xs",
      gap: "gap-1.5",
    },
    md: {
      image: { width: 48, height: 48 },
      text: "text-base",
      subtitle: "text-sm",
      gap: "gap-2",
    },
    lg: {
      image: { width: 64, height: 64 },
      text: "text-lg",
      subtitle: "text-base",
      gap: "gap-3",
    },
    xl: {
      image: { width: 80, height: 80 },
      text: "text-xl",
      subtitle: "text-lg",
      gap: "gap-4",
    },
    "2xl": {
      image: { width: 100, height: 100 },
      text: "text-2xl",
      subtitle: "text-xl",
      gap: "gap-5",
    },
  };

  // Enhanced variant configurations
  const variantConfig = {
    default: {
      container: "flex items-center",
      title: "font-medium text-foreground",
      subtitle: "text-muted-foreground",
    },
    header: {
      container: "flex items-center",
      title: "font-bold text-foreground leading-tight",
      subtitle: "text-muted-foreground text-sm",
    },
    footer: {
      container: "flex items-center",
      title: "font-medium text-muted-foreground",
      subtitle: "text-muted-foreground/70",
    },
    sidebar: {
      container: "flex items-center",
      title: "font-medium text-foreground",
      subtitle: "text-muted-foreground",
    },
    mobile: {
      container: "flex items-center",
      title: "font-semibold text-foreground",
      subtitle: "text-muted-foreground text-xs",
    },
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  // Enhanced title rendering with better splitting logic
  const renderTitle = () => {
    if (!showTitle) return null;

    const title = String(t("title"));

    if (variant === "header" || variant === "mobile") {
      // Smart title splitting for headers
      const words = title.split(" ");

      if (words.length <= 2) {
        // Single line for short titles
        return (
          <span
            className={cn(
              currentSize.text,
              currentVariant.title,
              titleClassName
            )}
          >
            {title}
          </span>
        );
      }

      // Split into two balanced lines
      const midPoint = Math.ceil(words.length / 2);
      const firstLine = words.slice(0, midPoint).join(" ");
      const secondLine = words.slice(midPoint).join(" ");

      return (
        <div className="flex flex-col">
          <span
            className={cn(
              currentSize.text,
              currentVariant.title,
              titleClassName
            )}
          >
            {firstLine}
          </span>
          <span
            className={cn(
              currentSize.text,
              currentVariant.title,
              titleClassName
            )}
          >
            {secondLine}
          </span>
        </div>
      );
    }

    return (
      <span
        className={cn(currentSize.text, currentVariant.title, titleClassName)}
      >
        {title}
      </span>
    );
  };

  // Render subtitle if enabled
  const renderSubtitle = () => {
    if (!showSubtitle) return null;

    const subtitle = String(t(subtitleKey));

    return (
      <span className={cn(currentSize.subtitle, currentVariant.subtitle)}>
        {subtitle}
      </span>
    );
  };

  return (
    <div className={cn(currentVariant.container, currentSize.gap, className)}>
      <div className={cn("relative flex-shrink-0", imageClassName)}>
        <Image
          src="/images/school_logo.png"
          alt="School Logo"
          width={currentSize.image.width}
          height={currentSize.image.height}
          className="object-contain"
          priority={size === "xl" || size === "2xl" || variant === "header"}
        />
      </div>

      <div className="flex flex-col">
        {renderTitle()}
        {renderSubtitle()}
      </div>
    </div>
  );
};

export default Logo;
