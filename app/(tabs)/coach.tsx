import { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Search, TrendingUp, Brain, Package, Sparkles } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ChatMessage } from '@/types/chat';
import { askGPT } from '@/utils/askGPT';

const SYSTEM_MESSAGE: ChatMessage = {
  role: 'system',
  content: `Du bist SparCoach – ein persönlicher KI-Coach, der ausschließlich beim Sparen hilft. Du sprichst den Nutzer immer mit "du" an, bist freundlich, locker und klar. 

Deine Aufgabe ist es, bei allem zu helfen, was mit Geld sparen, günstiger einkaufen, Cashback, Rabatten, Angeboten, Timing oder Spartaktik zu tun hat – aber du gibst **keine Finanzberatung**.

Formatiere deine Antworten mit klarer Struktur und Emojis.`
};

const WELCOME_MESSAGES = [
  'Hallo! Ich bin dein persönlicher SparCoach – immer an deiner Seite.',
  'Wie kann ich dir beim Sparen helfen?'
];

const QUICK_ACTIONS = [
  {
    id: '3',
    icon: Brain,
    title: '🧠 Analyse starten',
    description: 'Starte eine personalisierte Analyse für individuelle Spartipps.',
    prompt: 'Lass uns mit einer personalisierten Analyse beginnen. Wofür gibst du aktuell regelmäßig Geld aus?',
    color: '#F3E5F5',
  },
  {
    id: '1',
    icon: Search,
    title: '🔍 Sparpotenzial entdecken',
    description: 'Lass dir smarte Möglichkeiten anzeigen, Cashback, Gutscheine oder Kombis zu nutzen.',
    prompt: 'Zeige mir bitte die aktuell besten Sparmöglichkeiten und wie ich sie kombinieren kann.',
    color: '#E8F5E9',
  },
  {
    id: '2',
    icon: TrendingUp,
    title: '📊 Zeitpunkt-Analyse',
    description: 'Erhalte eine detaillierte Einschätzung zum besten Kaufzeitpunkt.',
    prompt: 'Analysiere bitte den besten Kaufzeitpunkt für das neue iPhone.',
    color: '#E3F2FD',
  },
  {
    id: '4',
    icon: Package,
    title: '📦 Beste Deals heute',
    description: 'Zeigt KI-kuratierte Tagesangebote mit Bewertung.',
    prompt: 'Zeige mir die besten Deals von heute und erkläre, warum sie besonders gut sind.',
    color: '#FFF3E0',
  },
];

function CoachScreen() {
  const isMounted = useRef(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasShownWelcomeRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    if (hasShownWelcomeRef.current) return;
    hasShownWelcomeRef.current = true;

    (async () => {
      for (const msg of WELCOME_MESSAGES) {
        if (!mounted || !isMounted.current) break;
        await typeMessage(msg);
        if (isMounted.current) {
          setMessages(prev => [...prev, { role: 'assistant', content: msg }]);
        }
        await delay(500);
      }
    })();

    return () => {
      mounted = false;
      isMounted.current = false;
      clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const typeMessage = (message: string): Promise<void> => {
    return new Promise(resolve => {
      let i = 0;
      const type = () => {
        if (i <= message.length && isMounted.current) {
          setCurrentText(message.slice(0, i));
          i++;
          typingTimeoutRef.current = setTimeout(type, 30);
        } else {
          if (isMounted.current) {
            setCurrentText('');
          }
          resolve();
        }
      };
      type();
    });
  };

  const handleSend = async (text?: string) => {
    const content = text || inputText.trim();
    if (!content || isLoading || !isMounted.current) return;

    const userMessage: ChatMessage = { role: 'user', content };
    if (isMounted.current) {
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      setIsLoading(true);
    }

    try {
      const response = await askGPT([SYSTEM_MESSAGE, ...messages, userMessage]);
      const assistantMessage: ChatMessage = { role: 'assistant', content: response };
      if (isMounted.current) {
        setMessages(prev => [...prev, assistantMessage]);
        await delay(200);
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    } catch (error) {
      if (isMounted.current) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Fehler bei der Verarbeitung. Bitte versuche es später erneut.' }]);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const handleQuickAction = (action: typeof QUICK_ACTIONS[0]) => {
    if (isLoading || !isMounted.current) return;
    if (isMounted.current) {
      setShowSuggestions(false);
    }
    handleSend(action.prompt);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={["#2DC6C9", "#1C2A4A"]} style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)} style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Sparkles size={24} color="#FFFFFF" strokeWidth={1.5} />
          </View>
          <View>
            <Text style={styles.title}>SparCoach</Text>
            <View style={styles.gptBadge}>
              <Text style={styles.gptText}>Powered by Modell 4.0</Text>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View key={index} style={[styles.messageContainer, message.role === 'user' ? styles.userMessage : styles.assistantMessage]}>
            {message.role === 'assistant' && (
              <View style={styles.avatarContainer}>
                <Sparkles size={20} color="#2DC6C9" strokeWidth={1.5} />
              </View>
            )}
            <View style={[styles.messageBubble, message.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
              <Text style={[styles.messageText, message.role === 'user' ? styles.userText : styles.assistantText]}>
                {message.content}
              </Text>
            </View>
          </View>
        ))}

        {currentText !== '' && (
          <View style={[styles.messageContainer, styles.assistantMessage]}>
            <View style={styles.avatarContainer}>
              <Sparkles size={20} color="#2DC6C9" strokeWidth={1.5} />
            </View>
            <View style={[styles.messageBubble, styles.assistantBubble]}>
              <Text style={[styles.messageText, styles.assistantText]}>{currentText}</Text>
            </View>
          </View>
        )}

        {isLoading && (
          <View style={[styles.messageContainer, styles.assistantMessage]}>
            <View style={styles.avatarContainer}>
              <Sparkles size={20} color="#2DC6C9" strokeWidth={1.5} />
            </View>
            <View style={[styles.messageBubble, styles.assistantBubble, styles.loadingBubble]}>
              <ActivityIndicator color="#2DC6C9" />
            </View>
          </View>
        )}
      </ScrollView>

      <Animated.View entering={FadeInUp.duration(600)} style={styles.inputContainer}>
        <TouchableOpacity style={styles.suggestionsButton} onPress={() => setShowSuggestions(true)} activeOpacity={0.8}>
          <Text style={styles.suggestionsButtonText}>Vorschläge entdecken</Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Stelle mir eine Frage..."
            placeholderTextColor="#94A3B8"
            value={inputText}
            onChangeText={setInputText}
            multiline={false}
            maxLength={500}
          />

          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            activeOpacity={0.7}
          >
            <Send size={20} color={inputText.trim() ? "#2DC6C9" : "#94A3B8"} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Modal
        visible={showSuggestions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuggestions(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View entering={FadeInUp.duration(300)} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Vorschläge</Text>
              <TouchableOpacity onPress={() => setShowSuggestions(false)} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.quickActions}>
              {QUICK_ACTIONS.map((action, index) => (
                <Animated.View key={action.id} entering={FadeInDown.duration(400).delay(400 + index * 100)}>
                  <TouchableOpacity
                    style={[styles.quickActionCard, { backgroundColor: action.color }]}
                    onPress={() => handleQuickAction(action)}
                    activeOpacity={0.9}
                  >
                    <View style={[styles.quickActionIcon, { backgroundColor: '#FFFFFF' }]}> 
                      <action.icon size={20} color="#2DC6C9" strokeWidth={1.5} />
                    </View>
                    <View style={styles.quickActionContent}>
                      <Text style={styles.quickActionTitle}>{action.title}</Text>
                      <Text style={styles.quickActionDescription}>{action.description}</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  gptBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gptText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  chatContent: {
    padding: 20,
    paddingBottom: 100,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  assistantMessage: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 16,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  userBubble: {
    backgroundColor: '#2DC6C9',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  loadingBubble: {
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: '#1A1A1A',
  },
  inputContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 12,
  },
  suggestionsButton: {
    backgroundColor: '#2DC6C9',
    paddingVertical: 12,
    borderRadius: 12,
    width: '100%',
  },
  suggestionsButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#2DC6C9',
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#2DC6C9',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseText: {
    fontSize: 20,
    color: '#94A3B8',
  },
  quickActions: {
    gap: 12,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
});

export default CoachScreen;