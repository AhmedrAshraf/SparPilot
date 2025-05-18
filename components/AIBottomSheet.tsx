import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MessageCircle, Send } from 'lucide-react-native';
import Animated, { FadeInUp, SlideInDown } from 'react-native-reanimated';

interface AIBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

const sampleQuestions = [
  'Beste Angebote',
  'Spartipps',
  'Preisvergleich',
];

export default function AIBottomSheet({ visible, onClose }: AIBottomSheetProps) {
  const [question, setQuestion] = useState('');

  if (!visible) return null;

  return (
    <Animated.View 
      entering={FadeInUp.duration(200)}
      style={styles.overlay}
    >
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <Animated.View 
        entering={SlideInDown.duration(300)}
        style={styles.sheet}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <MessageCircle size={24} color="#16a085" />
            <Text style={styles.title}>Dein SparCoach</Text>
            <View style={styles.aiTag}>
              <Text style={styles.aiText}>AI</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.subtitle}>Beispielfragen:</Text>
          {sampleQuestions.map((q, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.questionButton}
              onPress={() => setQuestion(q)}
            >
              <Text style={styles.questionText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Stelle mir eine Frage..."
            placeholderTextColor="#9aa0a6"
            value={question}
            onChangeText={setQuestion}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !question && styles.sendButtonDisabled]}
            disabled={!question}
          >
            <Send size={20} color={question ? '#16a085' : '#9aa0a6'} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  header: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#202124',
  },
  aiTag: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiText: {
    color: '#16a085',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#5f6368',
    marginBottom: 16,
  },
  questionButton: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    color: '#202124',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#202124',
  },
  sendButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
});