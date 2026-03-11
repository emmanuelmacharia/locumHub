<script setup lang="ts">
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  senderImage?: string;
  senderType: "pharmacy" | "locum";
  preview: string;
  timestamp: string;
  unread: boolean;
  shiftContext?: string;
}

export interface MessagingPanelProps {
  messages: Message[];
  unreadCount: number;
  className?: string;
  onViewAll: () => void;
  onOpenMessage: (messageId: string) => void;
}

const formatTimestamp = (timestamp: string) =>
  new Intl.DateTimeFormat("en-KE", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));

const emptyStateConfig = {
  icon: "lucide:message-square",
  title: "No messages yet",
  description:
    "When you connect with pharmacies or locums, your conversations will appear here.",
  variant: "minimal" as "default" | "minimal",
};

defineProps<{ data: MessagingPanelProps }>();
</script>

<template>
  <div v-if="data.messages.length === 0">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <Icon name="lucide:message-square" class="h-5 w-5 text-primary" />
        <h3 class="text-base font-semibold">Messages</h3>
      </div>
    </div>
    <DashboardEmptyState :config="emptyStateConfig" />
  </div>
  <div v-else>
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <Icon name="lucide:message-square" class="h-5 w-5 text-primary" />
        <h3 class="text-base font-semibold">Messages</h3>
        <UIBadge
          v-if="data.unreadCount > 0"
          class="bg-emerald-500 text-primary-foreground text-xs px-2"
        >
          {{ data.unreadCount }} new
        </UIBadge>
      </div>
      <ClientOnly>
        <UIButton
          v-if="data.onViewAll"
          variant="ghost"
          size="sm"
          class="text-xs text-emerald-500 gap-1 h-7"
          @click="data.onViewAll()"
        >
          View All
          <Icon name="lucide:chevron-right" class="h-3.5 w-3.5" />
        </UIButton>
      </ClientOnly>
    </div>
    <div class="space-y-2">
      <ClientOnly>
        <button
          v-for="message in data.messages"
          :key="message.id"
          class="w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left hover:bg-muted/50 hover:border-emerald-500/20"
          :class="
            message.unread
              ? 'bg-emerald-500/5 border-emerald-500/20'
              : 'bg-card border-border'
          "
          @click="data.onOpenMessage(message.id)"
        >
          <div class="relative">
            <UIAvatar class="h-10 w-10">
              <UIAvatarImage :src="message.senderImage || ''" />
              <UIAvatarFallback
                class="bg-emerald-500/10 text-emerald-500 text-sm font-semibold"
              >
                {{
                  message.senderName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                }}
              </UIAvatarFallback>
            </UIAvatar>
            <span
              class="-right-0.5 -top-0.5 absolute h-3 w-3 bg-emerald-500 rounded-full border-2 border-emerald-500"
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2 mb-0.5">
              <span
                :class="`text-sm truncate ${message.unread ? 'font-semibold' : 'font-medium'}`"
              >
                {{ message.senderName }}
              </span>
              <span
                class="text-[10px] text-muted-foreground flex items-center gap-1 flex-shrink-0"
              >
                <Icon name="lucide:clock" class="h-2.5 w-2.5" />
                {{ formatTimestamp(message.timestamp) }}
              </span>
            </div>
            <span
              v-if="message.shiftContext"
              class="text-[10px] text-emerald-500 font-medium"
            >
              Re: {{ message.shiftContext }}
            </span>
            <p
              :class="`text-xs truncate  ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`"
            >
              {{ message.preview }}
            </p>
          </div>
        </button>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped></style>
