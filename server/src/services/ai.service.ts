import { Todo } from '../models/todo.model';

interface ChatResponse {
  message: string;
  suggestions?: string[];
}

export class AIService {
  analyze(userMessage: string, todos: Todo[]): ChatResponse {
    const msg = userMessage.toLowerCase().trim();

    // ─── Summary / Overview ──────────────────────────
    if (msg.includes('summary') || msg.includes('summarize') || msg.includes('overview') || msg.includes('how many')) {
      return this.getSummary(todos);
    }

    // ─── Overdue ─────────────────────────────────────
    if (msg.includes('overdue') || msg.includes('late') || msg.includes('missed') || msg.includes('past due')) {
      return this.getOverdue(todos);
    }

    // ─── Priority ────────────────────────────────────
    if (msg.includes('priority') || msg.includes('priorities') || msg.includes('important') || msg.includes('urgent')) {
      return this.getPrioritySuggestions(todos);
    }

    // ─── Productivity / Tips ─────────────────────────
    if (msg.includes('tip') || msg.includes('productivity') || msg.includes('advice') || msg.includes('help me')) {
      return this.getProductivityTips(todos);
    }

    // ─── Today ───────────────────────────────────────
    if (msg.includes('today') || msg.includes('due today') || msg.includes('what should i do')) {
      return this.getToday(todos);
    }

    // ─── Categories ──────────────────────────────────
    if (msg.includes('category') || msg.includes('categories') || msg.includes('group')) {
      return this.getCategoryBreakdown(todos);
    }

    // ─── Completed / Progress ────────────────────────
    if (msg.includes('completed') || msg.includes('done') || msg.includes('progress') || msg.includes('finish')) {
      return this.getProgress(todos);
    }

    // ─── Default / Greeting ──────────────────────────
    return this.getDefault(todos);
  }

  private getSummary(todos: Todo[]): ChatResponse {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const high = todos.filter(t => t.priority === 'high' && !t.completed).length;
    const overdue = this.countOverdue(todos);

    let message = `📊 **Task Summary**\n\n`;
    message += `• **${total}** total tasks\n`;
    message += `• **${active}** active, **${completed}** completed\n`;
    if (high > 0) message += `• 🔴 **${high}** high-priority tasks pending\n`;
    if (overdue > 0) message += `• ⚠️ **${overdue}** overdue tasks need attention!\n`;

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    message += `\nCompletion rate: **${pct}%**`;

    return {
      message,
      suggestions: ['What\'s overdue?', 'Suggest priorities', 'Show categories'],
    };
  }

  private getOverdue(todos: Todo[]): ChatResponse {
    const today = new Date(new Date().toDateString());
    const overdueTodos = todos.filter(
      t => t.due_date && !t.completed && new Date(t.due_date) < today
    );

    if (overdueTodos.length === 0) {
      return {
        message: '✅ Great news! You have no overdue tasks. Keep it up!',
        suggestions: ['Show summary', 'What should I do today?'],
      };
    }

    let message = `⚠️ **${overdueTodos.length} Overdue Task${overdueTodos.length > 1 ? 's' : ''}**\n\n`;
    overdueTodos.forEach(t => {
      const days = Math.ceil((today.getTime() - new Date(t.due_date!).getTime()) / (1000 * 60 * 60 * 24));
      message += `• **${t.title}** — ${days} day${days > 1 ? 's' : ''} overdue`;
      if (t.priority === 'high') message += ' 🔴';
      message += '\n';
    });
    message += '\nI suggest completing these first!';

    return {
      message,
      suggestions: ['Show summary', 'Productivity tips'],
    };
  }

  private getPrioritySuggestions(todos: Todo[]): ChatResponse {
    const active = todos.filter(t => !t.completed);
    const high = active.filter(t => t.priority === 'high');
    const medium = active.filter(t => t.priority === 'medium');
    const low = active.filter(t => t.priority === 'low');
    const noPriority = active.filter(t => !t.priority);

    let message = `🎯 **Priority Breakdown**\n\n`;
    message += `• 🔴 High: **${high.length}** task${high.length !== 1 ? 's' : ''}\n`;
    message += `• 🟡 Medium: **${medium.length}** task${medium.length !== 1 ? 's' : ''}\n`;
    message += `• 🟢 Low: **${low.length}** task${low.length !== 1 ? 's' : ''}\n`;
    if (noPriority.length > 0) {
      message += `• ⚪ No priority: **${noPriority.length}** — consider assigning priorities\n`;
    }

    if (high.length > 0) {
      message += `\n**Focus on these first:**\n`;
      high.slice(0, 3).forEach(t => {
        message += `→ ${t.title}${t.due_date ? ` (due ${new Date(t.due_date).toLocaleDateString()})` : ''}\n`;
      });
    }

    return {
      message,
      suggestions: ['What\'s overdue?', 'Show categories', 'Productivity tips'],
    };
  }

  private getProductivityTips(todos: Todo[]): ChatResponse {
    const active = todos.filter(t => !t.completed);
    const tips: string[] = [];

    if (active.length > 10) {
      tips.push('📋 You have many active tasks. Consider breaking them into smaller chunks.');
    }
    if (this.countOverdue(todos) > 0) {
      tips.push('⏰ Clear overdue tasks first — they create mental overhead.');
    }
    if (active.filter(t => t.priority === 'high').length > 3) {
      tips.push('🎯 Too many high-priority items. Try the "2-3 things" rule: pick max 3 high priorities per day.');
    }
    if (active.filter(t => !t.due_date).length > 0) {
      tips.push('📅 Set due dates! Tasks without deadlines are 70% less likely to get done.');
    }
    if (active.filter(t => !t.category).length > 0) {
      tips.push('🏷️ Add categories to group related tasks — it helps with batch processing.');
    }

    if (tips.length === 0) {
      tips.push('🌟 You\'re doing great! Your tasks are well organized.');
      tips.push('💪 Keep the momentum — tackle one task at a time.');
    }

    return {
      message: `💡 **Productivity Tips**\n\n${tips.join('\n\n')}`,
      suggestions: ['Show summary', 'What should I do today?'],
    };
  }

  private getToday(todos: Todo[]): ChatResponse {
    const today = new Date();
    const todayStr = today.toDateString();
    const active = todos.filter(t => !t.completed);

    // Find tasks due today
    const dueToday = active.filter(t =>
      t.due_date && new Date(t.due_date).toDateString() === todayStr
    );
    // Find overdue
    const overdue = active.filter(
      t => t.due_date && new Date(t.due_date) < new Date(todayStr)
    );
    // High priority without due date
    const highPrio = active.filter(t => t.priority === 'high' && !t.due_date);

    let message = `📅 **Today's Focus**\n\n`;

    if (overdue.length > 0) {
      message += `**Overdue (do these first!):**\n`;
      overdue.slice(0, 3).forEach(t => {
        message += `• ⚠️ ${t.title}\n`;
      });
      message += '\n';
    }

    if (dueToday.length > 0) {
      message += `**Due Today:**\n`;
      dueToday.forEach(t => {
        message += `• 📌 ${t.title}\n`;
      });
      message += '\n';
    }

    if (highPrio.length > 0) {
      message += `**High Priority:**\n`;
      highPrio.slice(0, 3).forEach(t => {
        message += `• 🔴 ${t.title}\n`;
      });
      message += '\n';
    }

    if (overdue.length === 0 && dueToday.length === 0 && highPrio.length === 0) {
      if (active.length === 0) {
        message += '🎉 All done! No outstanding tasks. Enjoy your day!';
      } else {
        message += `No urgent tasks today. You have **${active.length}** active tasks to work on when ready.`;
      }
    }

    return {
      message,
      suggestions: ['Suggest priorities', 'Productivity tips'],
    };
  }

  private getCategoryBreakdown(todos: Todo[]): ChatResponse {
    const active = todos.filter(t => !t.completed);
    const categories: Record<string, number> = {};

    active.forEach(t => {
      const cat = t.category || 'Uncategorized';
      categories[cat] = (categories[cat] || 0) + 1;
    });

    const entries = Object.entries(categories).sort((a, b) => b[1] - a[1]);

    if (entries.length === 0) {
      return {
        message: '📂 No active tasks to categorize.',
        suggestions: ['Show summary'],
      };
    }

    let message = `📂 **Categories**\n\n`;
    entries.forEach(([cat, count]) => {
      message += `• **${cat}**: ${count} task${count !== 1 ? 's' : ''}\n`;
    });

    return {
      message,
      suggestions: ['Show summary', 'Suggest priorities'],
    };
  }

  private getProgress(todos: Todo[]): ChatResponse {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const bar = '█'.repeat(Math.round(pct / 10)) + '░'.repeat(10 - Math.round(pct / 10));

    let message = `📈 **Progress**\n\n`;
    message += `${bar} **${pct}%**\n\n`;
    message += `**${completed}** of **${total}** tasks completed.`;

    if (pct === 100) message += '\n\n🎉 Perfect! All tasks done!';
    else if (pct >= 75) message += '\n\n💪 Almost there! Keep going!';
    else if (pct >= 50) message += '\n\n👍 Halfway done!';
    else message += '\n\n🚀 Let\'s pick up the pace!';

    return {
      message,
      suggestions: ['What should I do today?', 'Productivity tips'],
    };
  }

  private getDefault(todos: Todo[]): ChatResponse {
    const active = todos.filter(t => !t.completed).length;
    const overdue = this.countOverdue(todos);

    let message = `👋 Hi! I'm your todo assistant. I can help you with:\n\n`;
    message += `• **"Summary"** — overview of your tasks\n`;
    message += `• **"What's overdue?"** — find late tasks\n`;
    message += `• **"Priorities"** — see priority breakdown\n`;
    message += `• **"Today"** — what to focus on today\n`;
    message += `• **"Categories"** — task groups\n`;
    message += `• **"Progress"** — completion progress\n`;
    message += `• **"Tips"** — productivity advice\n`;

    if (active > 0) {
      message += `\nYou currently have **${active}** active task${active !== 1 ? 's' : ''}`;
      if (overdue > 0) message += ` (⚠️ ${overdue} overdue)`;
      message += '.';
    }

    return {
      message,
      suggestions: ['Show summary', 'What\'s overdue?', 'What should I do today?'],
    };
  }

  private countOverdue(todos: Todo[]): number {
    const today = new Date(new Date().toDateString());
    return todos.filter(
      t => t.due_date && !t.completed && new Date(t.due_date) < today
    ).length;
  }
}

export const aiService = new AIService();
