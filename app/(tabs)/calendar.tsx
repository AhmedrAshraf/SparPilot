import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Calendar } from 'lucide-react-native';

const CATEGORIES = [
  { id: '1', name: 'Alle Kategorien', icon: '🎯' },
  { id: '2', name: 'Technik', icon: '📱' },
  { id: '3', name: 'Reisen', icon: '✈️' },
  { id: '4', name: 'Mode', icon: '👕' },
  { id: '5', name: 'Haushalt', icon: '🏠' },
  { id: '6', name: 'Drogerie', icon: '🧴' },
  { id: '7', name: 'Abos', icon: '📦' },
  { id: '8', name: 'Cashback', icon: '💰' },
  { id: '9', name: 'Essen', icon: '🍽️' },
];

const EVENTS = [
  { id: '1', month: 'Jan', name: 'Neujahrssale', icon: '🎉', description: 'Beste Zeit für Wintermode und Fitness-Equipment' },
  { id: '2', month: 'Feb', name: 'Valentinsangebote', icon: '❤️', description: 'Schmuck und Kosmetik im Angebot' },
  { id: '3', month: 'Mär', name: 'Frühjahrsangebote', icon: '🌸', description: 'Garten- und Outdoor-Artikel stark reduziert' },
  { id: '4', month: 'Mai', name: 'Maifeiertage', icon: '🌺', description: 'Heimwerker-Produkte und Gartenmöbel' },
  { id: '5', month: 'Jul', name: 'Prime Day', icon: '📦', description: 'Amazon Mega-Sale mit bis zu 70% Rabatt' },
  { id: '6', month: 'Sep', name: 'Back to School', icon: '📚', description: 'Laptops und Schreibwaren günstig' },
  { id: '7', month: 'Nov', name: 'Black Friday', icon: '💻', description: 'Größter Shopping-Event des Jahres' },
  { id: '8', month: 'Dez', name: 'Weihnachtssale', icon: '🎄', description: 'Geschenke und Festtagsartikel' },
];

const CURRENT_MONTH = 'Mär';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.header}
      >
        <View style={styles.titleContainer}>
          <Calendar size={28} color="#2DC6C9" strokeWidth={1.5} />
          <Text style={styles.title}>Sparkalender</Text>
        </View>
        <Text style={styles.subtitle}>
          Die besten Kaufzeitpunkte im Jahresverlauf
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.duration(600).delay(200)}
        style={styles.categoriesWrapper}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                category.name === 'Alle Kategorien' && styles.categoryChipActive
              ]}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                category.name === 'Alle Kategorien' && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <ScrollView
        style={styles.timelineScroll}
        contentContainerStyle={styles.timelineScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.duration(600).delay(300)}
          style={styles.timelineContainer}
        >
          {EVENTS.map((event, index) => (
            <Animated.View
              key={event.id}
              entering={FadeInDown.duration(400).delay(index * 100)}
              style={styles.eventContainer}
            >
              <View style={styles.timelineLeft}>
                <View style={[
                  styles.timelineDot,
                  event.month === CURRENT_MONTH && styles.timelineDotActive
                ]} />
                {index < EVENTS.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <TouchableOpacity
                style={[
                  styles.eventCard,
                  event.month === CURRENT_MONTH && styles.eventCardActive
                ]}
                activeOpacity={0.95}
              >
                <View style={styles.eventHeader}>
                  <Text style={[
                    styles.eventMonth,
                    event.month === CURRENT_MONTH && styles.eventMonthActive
                  ]}>
                    {event.month}
                  </Text>
                  <Text style={styles.eventIcon}>{event.icon}</Text>
                </View>
                <Text style={[
                  styles.eventName,
                  event.month === CURRENT_MONTH && styles.eventNameActive
                ]}>
                  {event.name}
                </Text>
                <Text style={[
                  styles.eventDescription,
                  event.month === CURRENT_MONTH && styles.eventDescriptionActive
                ]}>
                  {event.description}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
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
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#2DC6C9',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  categoriesWrapper: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 8,
    flexDirection: 'row',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  categoryChipActive: {
    backgroundColor: '#2DC6C9',
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  timelineScroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  timelineScrollContent: {
    paddingBottom: 32,
  },
  timelineContainer: {
    paddingHorizontal: 20,
  },
  eventContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2DC6C9',
    opacity: 0.3,
    marginTop: 24,
  },
  timelineDotActive: {
    opacity: 1,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  eventCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  eventCardActive: {
    backgroundColor: '#2DC6C9',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventIcon: {
    fontSize: 24,
  },
  eventMonth: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
  },
  eventMonthActive: {
    color: '#FFFFFF',
  },
  eventName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  eventNameActive: {
    color: '#FFFFFF',
  },
  eventDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 20,
  },
  eventDescriptionActive: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
});