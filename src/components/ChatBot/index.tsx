import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import styles from './styles.module.css';
import { GROQ_MODEL } from './config';

function getGroqApiKey(): string {
  if (typeof window === 'undefined') return '';
  return (window as any).__GROQ_API_KEY || '';
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are an expert AI tutor for the "Physical AI & Humanoid Robotics" textbook. Your job is to help students understand the course content clearly and concisely.

## About This Textbook

This textbook teaches students how to design, simulate, and deploy humanoid robots using real-world tools. It bridges digital AI with the physical world through 4 modules:

### Module 1: The Robotic Nervous System (ROS 2)
- ROS 2 architecture: nodes, topics, services, actions
- Building ROS 2 packages with Python (rclpy)
- URDF (Unified Robot Description Format) for describing humanoid robot bodies
- Launch files and parameter management
- Bridging Python AI agents to ROS 2 controllers
- Publisher/subscriber patterns for robot communication

### Module 2: The Digital Twin (Gazebo & Unity)
- Gazebo simulation environment setup and physics simulation
- Simulating gravity, collisions, and rigid body dynamics
- URDF and SDF robot description formats
- Sensor simulation: LiDAR, Depth Cameras (RealSense), IMUs
- Unity for high-fidelity rendering and human-robot interaction
- Building virtual environments for robot testing before real hardware

### Module 3: The AI-Robot Brain (NVIDIA Isaac)
- NVIDIA Isaac Sim: photorealistic simulation and synthetic data generation
- Isaac ROS: hardware-accelerated perception pipeline
- Visual SLAM (VSLAM) for robot localization and mapping
- Nav2: path planning for bipedal humanoid movement
- Sim-to-real transfer techniques
- Reinforcement learning for robot control

### Module 4: Vision-Language-Action (VLA)
- Voice-to-Action: Using OpenAI Whisper for speech recognition and voice commands
- Cognitive Planning: Using LLMs to translate natural language ("Clean the room") into ROS 2 action sequences
- Vision-Language-Action models for end-to-end robot control
- Multi-modal interaction: speech, gesture, vision combined
- Capstone Project: Autonomous Humanoid — robot receives voice command, plans path, navigates obstacles, identifies object with computer vision, and manipulates it

## Key Technologies Covered
- **Python** — primary programming language
- **ROS 2 (Humble/Iron)** — robot middleware framework
- **Gazebo** — physics simulation
- **Unity** — high-fidelity rendering
- **NVIDIA Isaac Sim** — AI-powered simulation platform
- **PyTorch** — deep learning framework
- **NumPy** — scientific computing
- **OpenAI Whisper** — speech recognition
- **LLMs** — for cognitive planning and natural language understanding

## Hardware Context
- RTX 4070 Ti+ GPU required for Isaac Sim (24GB VRAM ideal)
- NVIDIA Jetson Orin Nano — edge AI deployment
- Intel RealSense D435i — depth camera with IMU
- Unitree Go2/G1 — robot hardware options

## Your Role
- Answer questions about any of the 4 modules clearly
- Explain technical concepts with examples and code snippets when helpful
- If the student selects text from the book, explain or expand on that specific passage
- Keep answers focused and educational
- If asked something unrelated to robotics/AI/this course, politely redirect to the textbook topics
- Use markdown formatting: **bold** for key terms, code blocks for code, bullet points for lists`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  selectedText?: string;
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

  // Close chatbot when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insidePanel = chatPanelRef.current?.contains(target);
      const insideToggle = toggleBtnRef.current?.contains(target);
      if (!insidePanel && !insideToggle) setIsOpen(false);
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Selected text from page
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

    const currentSelection = selectedText;
    setSelectedText('');

    const userMsg: Message = {
      role: 'user',
      content: text,
      selectedText: currentSelection || undefined,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStreamingContent('');

    // Build message history for context
    const historyMessages = messages.slice(-10).map(m => ({
      role: m.role,
      content: m.content,
    }));

    // Build user message content (include selected text if any)
    const userContent = currentSelection
      ? `I selected this text from the book:\n\n"${currentSelection}"\n\nMy question: ${text}`
      : text;

    const requestMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...historyMessages,
      { role: 'user', content: userContent },
    ];

    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getGroqApiKey()}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: requestMessages,
          stream: true,
          max_completion_tokens: 2048,
          temperature: 1,
          reasoning_effort: 'medium',
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Groq API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullContent += delta;
              setStreamingContent(fullContent);
            }
          } catch {
            // skip malformed chunk
          }
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: fullContent }]);
      setStreamingContent('');
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ Error: ${err.message || 'Failed to connect to Groq API. Check your API key.'}`,
      }]);
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
                    📝 "{msg.selectedText.slice(0, 120)}{msg.selectedText.length > 120 ? '...' : ''}"
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
              <button className={styles.clearSelection} onClick={() => setSelectedText('')}>✕</button>
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
