import { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View, Platform, Keyboard, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, ArrowRight } from 'lucide-react-native';

const PLACEHOLDERS = [
  'iPhone 16 kaufen',
  'Flug nach Mallorca buchen',
  'Stromtarif wechseln',
  'Netflix-Abo vergleichen',
  'Günstige Hotels finden',
  'PS5 mit Cashback kaufen',
  'Bester Zeitpunkt für MacBook?',
  'Gutscheine mit Rabatt für Zalando'
];

const TYPING_SPEED = 70;
const PAUSE_DURATION = 1500;
const BACKSPACE_SPEED = 50;

export default function SearchBar() {
  const router = useRouter();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();
  const inactivityTimeoutRef = useRef<NodeJS.Timeout>();

  const resetAnimation = () => {
    setDisplayText('');
    setIsTyping(true);
    setIsDeleting(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsPaused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (!inputValue) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        resetAnimation();
      }, 10000);
      inactivityTimeoutRef.current = timeout;
    }
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  };

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    
    Keyboard.dismiss();
    router.push(`/search/${encodeURIComponent(inputValue.trim())}`);
    setInputValue('');
  };

  useEffect(() => {
    if (isPaused) return;

    const currentPlaceholder = PLACEHOLDERS[currentIndex];

    if (isTyping) {
      if (displayText.length < currentPlaceholder.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentPlaceholder.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, PAUSE_DURATION);
      }
    } else if (isDeleting) {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, BACKSPACE_SPEED);
      } else {
        setIsDeleting(false);
        setIsTyping(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % PLACEHOLDERS.length);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_DURATION);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isTyping, isDeleting, currentIndex, isPaused]);

  useEffect(() => {
    const keyboardDismiss = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsFocused(false);
        if (!inputValue) {
          const timeout = setTimeout(() => {
            setIsPaused(false);
            resetAnimation();
          }, 10000);
          inactivityTimeoutRef.current = timeout;
        }
      }
    );

    return () => keyboardDismiss.remove();
  }, [inputValue]);

  return (
    <View style={styles.container}>
      <View style={[
        styles.searchContainer,
        isFocused && styles.searchContainerFocused
      ]}>
        <Search size={20} color="#9AA0A6" strokeWidth={1.5} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={isPaused ? '' : displayText}
          placeholderTextColor="#9AA0A6"
          value={inputValue}
          onChangeText={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {inputValue.trim().length > 0 && (
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            activeOpacity={0.8}
          >
            <ArrowRight size={20} color="#FFFFFF" strokeWidth={1.5} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 2,
  },
  searchContainerFocused: {
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
    padding: 0,
    fontFamily: 'Inter-Regular',
    letterSpacing: -0.3,
  },
  searchButton: {
    backgroundColor: '#2DC6C9',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});