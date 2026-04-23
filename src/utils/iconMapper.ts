import {
  Flower2,
  BookOpen,
  FileText,
  CodeXml,
  Mail,
  Home,
  User,
  Briefcase,
  GraduationCap,
  Star,
  Heart,
  Lightbulb,
  Rocket,
  Folder,
  Terminal,
  Link,
  MessageCircleCode,
  Phone,
  MessageSquare,
  Send,
  Pickaxe,
  Hammer,
  Wrench,
  FolderCode,
} from "@lucide/astro";

// Social media icon components
import GitHub from "../components/icons/GitHub.astro";
import LinkedIn from "../components/icons/LinkedIn.astro";
import Twitter from "../components/icons/Twitter.astro";
import cnBlogs from "../components/icons/cnBlogs.astro";
import Instagram from "../components/icons/Instagram.astro";

export type IconName =
  | "Flower2"
  | "BookOpen"
  | "FileText"
  | "CodeXml"
  | "Mail"
  | "Home"
  | "User"
  | "Briefcase"
  | "GraduationCap"
  | "Star"
  | "Heart"
  | "Lightbulb"
  | "Rocket"
  | "Folder"
  | "Terminal"
  | "Link"
  | "MessageCircleCode"
  | "Phone"
  | "MessageSquare"
  | "Send"
  | "Pickaxe"
  | "Hammer"
  | "Wrench"
  | "FolderCode"
  | "GitHub"
  | "LinkedIn"
  | "Twitter"
  | "cnBlogs"
  | "Instagram"
  | "Email";

export const iconMap: Record<IconName, any> = {
  Flower2,
  BookOpen,
  FileText,
  CodeXml,
  Mail,
  Home,
  User,
  Briefcase,
  GraduationCap,
  Star,
  Heart,
  Lightbulb,
  Rocket,
  Folder,
  Terminal,
  Link,
  MessageCircleCode,
  Phone,
  MessageSquare,
  Send,
  Pickaxe,
  Hammer,
  Wrench,
  FolderCode,
  GitHub,
  LinkedIn,
  Twitter,
  cnBlogs,
  Instagram,
  Email: Mail,
};

export function getIcon(iconName: IconName) {
  return iconMap[iconName];
}
