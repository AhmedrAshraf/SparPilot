import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, TrendingUp, Check, MessageCircle } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const SHOPPING_EVENTS = [
  { id: '1', month: 'Jan', name: 'Neujahrssale', icon: '🎉', isRelevant: true },
  { id: '2', month: 'Mär', name: 'Frühjahrsangebote', icon: '🌸', isRelevant: true },
  { id: '3', month: 'Mai', name: 'Maifeiertage', icon: '🌺', isRelevant: false },
  { id: '4', month: 'Jul', name: 'Prime Day', icon: '📦', isRelevant: true },
  { id: '5', month: 'Sep', name: 'Back to School', icon: '📚', isRelevant: true },
  { id: '6', month: 'Nov', name: 'Black Friday', icon: '💻', isRelevant: true },
  { id: '7', month: 'Dez', name: 'Weihnachtssale', icon: '🎄', isRelevant: false },
];

const CURRENT_MONTH = 'Mär';

const DEALS = [
  {
    id: '1',
    title: 'MacBook Air M3',
    image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    currentPrice: 1299,
    originalPrice: 1449,
    savings: 11,
    stores: ['MediaMarkt', 'Amazon', 'Apple'],
    bestStore: 'Amazon',
    benefits: [
      { title: 'Gutscheincode verfügbar', detail: 'Code: BACK2UNI' },
      { title: 'Cashback möglich', detail: '2% mit Vivid / 1% mit Trade Republic' },
      { title: 'Kombinierbar mit', detail: 'Lidl Plus Vorteil / Payback Punkte' }
    ],
    priceHistory: {
      status: 'Jetzt ist ein guter Zeitpunkt',
      detail: 'Aktueller Preis ist der niedrigste der letzten 3 Monate'
    },
    conclusion: 'Jetzt zuschlagen: Apple senkt erfahrungsgemäß Preise nach Messen. Der Gutschein ist kombinierbar und das Angebot ist das Beste seit 3 Monaten. Mit Cashback und Payback-Punkten können Sie zusätzlich sparen.'
  }
];

function SavingsTimeline() {
  return (
    <View style={styles.timelineContainer}>
      <Text style={styles.timelineTitle}>Sparkalender 2024</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timelineScroll}
      >
        <View style={styles.timelineLine}>
          {SHOPPING_EVENTS.map((event, index) => (
            <View key={event.id} style={styles.eventContainer}>
              {index > 0 && <View style={styles.timelineConnector} />}
              <View style={[
                styles.eventMarker,
                event.isRelevant && styles.eventMarkerRelevant,
                event.month === CURRENT_MONTH && styles.eventMarkerCurrent
              ]}>
                <Text style={styles.eventIcon}>{event.icon}</Text>
                <Text style={styles.eventMonth}>{event.month}</Text>
                <Text style={styles.eventName}>{event.name}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Text style={styles.timelineHint}>
        Nächster Top-Deal: Black Friday – relevant für Technik (in 8 Monaten)
      </Text>
    </View>
  );
}

export default function LaptopsScreen() {
  const router = useRouter();

  const handleStoreLink = (store: string) => {
    Linking.openURL('https://example.com');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#2DC6C9" strokeWidth={1.5} />
        </TouchableOpacity>

        {DEALS.map((deal, index) => (
          <Animated.View
            key={deal.id}
            entering={FadeInDown.duration(400).delay(index * 100)}
          >
            <Image source={{ uri: deal.image }} style={styles.dealImage} />
            
            <View style={styles.content}>
              <Text style={styles.dealTitle}>{deal.title}</Text>
              
              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>{deal.currentPrice} €</Text>
                <Text style={styles.originalPrice}>{deal.originalPrice} €</Text>
                <View style={styles.savingsTag}>
                  <Text style={styles.savingsText}>-{deal.savings}%</Text>
                </View>
              </View>

              <View style={styles.storesContainer}>
                <Text style={styles.storesTitle}>Verfügbar bei:</Text>
                <View style={styles.storesList}>
                  {deal.stores.map((store, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.storeButton,
                        store === deal.bestStore && styles.bestStoreButton
                      ]}
                      onPress={() => handleStoreLink(store)}
                    >
                      <Text style={[
                        styles.storeButtonText,
                        store === deal.bestStore && styles.bestStoreButtonText
                      ]}>
                        {store}
                      </Text>
                      {store === deal.bestStore && (
                        <Text style={styles.bestPrice}>Bester Preis</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.priceHistoryCard}>
                <View style={styles.cardHeader}>
                  <TrendingUp size={20} color="#2E7D32" />
                  <Text style={styles.cardTitle}>Preisentwicklung</Text>
                </View>
                <Text style={styles.priceStatus}>{deal.priceHistory.status}</Text>
                <Text style={styles.priceDetail}>{deal.priceHistory.detail}</Text>
              </View>

              <SavingsTimeline />

              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Sparvorteile & Kombis</Text>
                {deal.benefits.map((benefit, idx) => (
                  <View key={idx} style={styles.benefitItem}>
                    <Check size={20} color="#2DC6C9" strokeWidth={1.5} />
                    <View style={styles.benefitText}>
                      <Text style={styles.benefitTitle}>{benefit.title}</Text>
                      <Text style={styles.benefitDetail}>{benefit.detail}</Text>
                    </View>
                  </View>
                ))}
                <Text style={styles.benefitsNote}>
                  Mehrfach kombinierbar für maximalen Rabatt
                </Text>
              </View>

              <View style={styles.conclusionContainer}>
                <View style={styles.conclusionHeader}>
                  <MessageCircle size={24} color="#2DC6C9" />
                  <Text style={styles.conclusionTitle}>SparCoach-Fazit</Text>
                </View>
                <Text style={styles.conclusionText}>{deal.conclusion}</Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dealImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 24,
  },
  dealTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#2DC6C9',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 24,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  savingsTag: {
    backgroundColor: '#2DC6C9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  savingsText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  storesContainer: {
    marginBottom: 24,
  },
  storesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
    marginBottom: 12,
  },
  storesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  storeButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  bestStoreButton: {
    backgroundColor: '#2DC6C9',
  },
  storeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
  },
  bestStoreButtonText: {
    color: 'white',
  },
  bestPrice: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#E0F2F1',
    marginTop: 4,
  },
  priceHistoryCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  priceStatus: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  priceDetail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  timelineContainer: {
    marginBottom: 24,
  },
  timelineTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  timelineScroll: {
    paddingHorizontal: 4,
  },
  timelineLine: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
  },
  eventContainer: {
    alignItems: 'center',
    width: 100,
  },
  timelineConnector: {
    position: 'absolute',
    top: '30%',
    left: -50,
    width: 100,
    height: 2,
    backgroundColor: '#E2E8F0',
  },
  eventMarker: {
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 8,
    width: 80,
  },
  eventMarkerRelevant: {
    backgroundColor: '#E0F2F1',
  },
  eventMarkerCurrent: {
    backgroundColor: '#2DC6C9',
  },
  eventIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  eventMonth: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#64748B',
    marginBottom: 2,
  },
  eventName: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
  timelineHint: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 12,
    textAlign: 'center',
  },
  benefitsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  benefitsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  benefitDetail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  benefitsNote: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  conclusionContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  conclusionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  conclusionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  conclusionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    lineHeight: 22,
  },
});