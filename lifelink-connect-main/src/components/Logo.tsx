import { Heart } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} bg-primary rounded-2xl flex items-center justify-center shadow-button`}>
        <Heart className="w-1/2 h-1/2 text-primary-foreground fill-primary-foreground" />
      </div>
      {showText && (
        <span className={`${textClasses[size]} font-bold text-foreground`}>
          Life<span className="text-primary">Link</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
