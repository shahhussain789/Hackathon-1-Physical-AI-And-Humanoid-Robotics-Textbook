import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import styles from './styles.module.css';

const API_URL = typeof window !== 'undefined'
  ? (window as any).__CHATBOT_API_URL || 'http://localhost:8000'
  : 'http://localhost:8000';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  selectedText?: string;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem('chat_session_id');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('chat_session_id', id);
  }
  return id;
}

function MarkdownContent({ text }: { text: string }): ReactNode {
  const parts = text.split(/(```[\s\S]*?```|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('```')) {
          const code = part.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
          return <pre key={i}><code>{code}</code></pre>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} style={{ background: 'rgba(128,128,128,0.12)', padding: '2px 5px', borderRadius: '3px', fontSize: '0.85em' }}>{part.slice(1, -1)}</code>;
        }
        const lines = part.split('\n');
        return lines.map((line, j) => {
          const boldReplaced = line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
          return <span key={`${i}-${j}`} dangerouslySetInnerHTML={{ __html: boldReplaced + (j < lines.length - 1 ? '<br/>' : '') }} />;
        });
      })}
    </>
  );
}

export default function ChatBot(): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, streamingContent]);

  // Close chatbot when clicking outside the panel or toggle button
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insidePanel = chatPanelRef.current?.contains(target);
      const insideToggle = toggleBtnRef.current?.contains(target);
      if (!insidePanel && !insideToggle) {
        setIsOpen(false);
      }
    };
    // Small delay so the toggle-open click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection) return;
    const text = selection.toString().trim();
    if (text.length > 10 && text.length < 2000) {
      const isInsideChat = selection.anchorNode?.parentElement?.closest(`.${styles.chatPanel}`);
      if (!isInsideChat) {
        setSelectedText(text);
        if (!isOpen) setIsOpen(true);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    return () => document.removeEventListener('mouseup', handleTextSelection);
  }, [handleTextSelection]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      role: 'user',
      content: text,
      selectedText: selectedText || undefined,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStreamingContent('');

    const currentSelection = selectedText;
    setSelectedText('');

    try {
      const response = await fetch(`${API_URL}/api/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          session_id: getSessionId(),
          selected_text: currentSelection || null,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            fullContent += data;
            setStreamingContent(fullContent);
          }
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fullContent }]);
      setStreamingContent('');
    } catch (err) {
      try {
        const response = await fetch(`${API_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            session_id: getSessionId(),
            selected_text: currentSelection || null,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } else {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'Sorry, I couldn\'t connect to the chatbot API. Make sure the backend is running at ' + API_URL,
          }]);
        }
      } catch {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I couldn\'t connect to the chatbot API. Make sure the backend is running at ' + API_URL,
        }]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles.chatPanel} ref={chatPanelRef}>
          <div className={styles.chatHeader}>
            <div>
              <div className={styles.chatTitle}>AI Tutor</div>
              <div className={styles.chatSubtitle}>Ask about Physical AI & Robotics</div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className={styles.messages}>
            {messages.length === 0 && !streamingContent && (
              <div className={styles.welcome}>
                Hi! I'm your AI tutor for this textbook. Ask me anything about Physical AI, ROS 2, Gazebo, NVIDIA Isaac, or VLA models.
                <br /><br />
                <strong>Tip:</strong> Select any text on the page to ask about it!
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i}>
                {msg.selectedText && (
                  <div className={styles.selectedTextBadge}>
                    📝 "{msg.selectedText.slice(0, 120)}
                    {msg.selectedText.length > 120 ? '...' : ''}"
                  </div>
                )}
                <div className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.botMsg}`}>
                  {msg.role === 'assistant' ? <MarkdownContent text={msg.content} /> : msg.content}
                </div>
              </div>
            ))}

            {streamingContent && (
              <div className={`${styles.message} ${styles.botMsg}`}>
                <MarkdownContent text={streamingContent} />
              </div>
            )}

            {loading && !streamingContent && (
              <div className={styles.typing}>Thinking...</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {selectedText && (
            <div className={styles.selectionBar}>
              <span>📝</span>
              <span className={styles.selectionText}>{selectedText}</span>
              <button className={styles.clearSelection} onClick={() => setSelectedText('')}>
                ✕
              </button>
            </div>
          )}

          <div className={styles.inputArea}>
            <input
              className={styles.chatInput}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={selectedText ? 'Ask about selected text...' : 'Ask a question...'}
              disabled={loading}
            />
            <button
              className={styles.sendBtn}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        ref={toggleBtnRef}
        className={styles.chatToggle}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AI Tutor"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
}
