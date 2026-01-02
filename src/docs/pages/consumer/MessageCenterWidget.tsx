import { useNavigate } from "react-router-dom";
import { WexCard } from "@/components/wex/wex-card";
import { WexButton } from "@/components/wex/wex-button";
import { WexBadge } from "@/components/wex/wex-badge";
import { WexSeparator } from "@/components/wex/wex-separator";
import { ChevronRight, AlertTriangle, Mail, Star, Clock, Bell, FileText } from "lucide-react";

/**
 * Message Center Widget
 * 
 * Priority-focused message widget for the homepage displaying:
 * - Quick stats overview (urgent, unread, starred, recently viewed)
 * - To-do list of important messages
 * 
 * Designed for quick scanning with clean, sophisticated UI
 */

interface MessageItem {
  id: string;
  title: string;
  category: string;
  date: string;
  icon: "alert" | "bell" | "document";
  badge?: {
    label: string;
    intent: "destructive" | "info";
  };
}

// Mock message data for To Do list
const toDoMessages: MessageItem[] = [
  {
    id: "1",
    title: "HSA Contribution Maximum Warning",
    category: "Contributions & Investments",
    date: "Today, 9:55 AM",
    icon: "alert",
    badge: {
      label: "Action Required",
      intent: "destructive",
    },
  },
  {
    id: "2",
    title: "HSA Contribution Notification",
    category: "Contributions & Investments",
    date: "Yesterday, 2:30 PM",
    icon: "bell",
  },
  {
    id: "3",
    title: "Tax Form Available: 1099-SA",
    category: "Statements & Tax Documents",
    date: "Nov 23, 2025",
    icon: "document",
    badge: {
      label: "New Document",
      intent: "info",
    },
  },
];

export function MessageCenterWidget() {
  const navigate = useNavigate();

  const getIcon = (iconType: "alert" | "bell" | "document") => {
    switch (iconType) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "bell":
        return <Bell className="h-5 w-5 text-primary" />;
      case "document":
        return <FileText className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Mail className="h-5 w-5 text-primary" />;
    }
  };

  // Stats data
  const stats = [
    { label: "Urgent Items", count: 2, icon: <AlertTriangle className="h-5 w-5 text-destructive" />, bgColor: "bg-destructive/10" },
    { label: "Unread Messages", count: 10, icon: <Mail className="h-5 w-5 text-primary" />, bgColor: "bg-primary/10" },
    { label: "Starred Items", count: 5, icon: <Star className="h-5 w-5 text-warning" />, bgColor: "bg-warning/10" },
    { label: "Recently Viewed", count: 12, icon: <Clock className="h-5 w-5 text-info" />, bgColor: "bg-info/10" },
  ];

  return (
    <WexCard>
      <WexCard.Content className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Message Center
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Overview of your recent communications
              </p>
            </div>
            <WexButton 
              intent="link" 
              size="sm"
              onClick={() => navigate("/message-center")}
              className="text-primary hover:text-primary/80"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </WexButton>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-shadow"
              >
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-display font-semibold text-foreground mb-1">
                  {stat.count}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* To Do Section */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">
              To Do
            </h3>
            
            <div className="space-y-0">
              {toDoMessages.map((message, index) => (
                <div key={message.id}>
                  <button
                    onClick={() => navigate("/message-center")}
                    className="w-full text-left py-3 px-3 -mx-3 rounded-lg transition-colors hover:bg-muted/50 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="mt-0.5 shrink-0">
                        {getIcon(message.icon)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {message.title}
                          </h4>
                          {message.badge && (
                            <WexBadge 
                              intent={message.badge.intent} 
                              size="sm" 
                              className="shrink-0 text-xs px-2 py-0.5"
                            >
                              {message.badge.label}
                            </WexBadge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{message.category}</span>
                          <span>•</span>
                          <span>{message.date}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                  {index < toDoMessages.length - 1 && <WexSeparator className="my-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span>Last updated: Just now</span>
            <div className="flex items-center gap-4">
              <WexButton 
                intent="link" 
                size="sm" 
                className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/message-center")}
              >
                Archive
              </WexButton>
              <WexButton 
                intent="link" 
                size="sm" 
                className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/message-center")}
              >
                Settings
              </WexButton>
            </div>
          </div>
        </div>
      </WexCard.Content>
    </WexCard>
  );
}
