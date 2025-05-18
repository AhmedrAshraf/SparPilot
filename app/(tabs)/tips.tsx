import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { Lightbulb, TrendingUp, CreditCard, ShoppingBag, Gift, Smartphone, Plane, Package, Chrome as Home, Shirt, Laptop, Headphones, Watch, Tv, Camera, Gamepad, Monitor, Hotel, Car, Brain as Train, Compass, Wallet, Receipt, ShoppingCart, Store, Coffee, Pizza, Utensils, Sparkles, Book, Briefcase, DollarSign, PiggyBank, Leaf, Zap, Droplet, Bus, Ticket, Calendar, Heart, Music, Film, Globe, ShoppingBasket, Percent, CreditCard as Card } from 'lucide-react-native';

const CATEGORIES = [
  { id: '1', name: 'Alle Tipps', icon: '🎯' },
  { id: '2', name: 'Technik', icon: '📱' },
  { id: '3', name: 'Reisen', icon: '✈️' },
  { id: '4', name: 'Abos', icon: '📦' },
  { id: '5', name: 'Alltag', icon: '🛒' },
  { id: '6', name: 'Kleidung', icon: '👕' },
];

const TIPS = [
  // Technik
  {
    id: '1',
    type: 'tech',
    icon: Smartphone,
    title: 'Smartphone-Timing',
    content: 'Kaufe neue iPhones im November statt zum Release. Nach dem Black Friday fallen die Preise bei **MediaMarkt** 🔗 und **Amazon** 🔗 oft um 15-20%.',
    color: '#E8F5E9',
    iconColor: '#2E7D32',
    category: 'Technik'
  },
  {
    id: '2',
    type: 'tech',
    icon: Laptop,
    title: 'Laptop-Deals',
    content: 'Student? Nutze Apple Education 🔗 + Amazon Prime Student 🔗. Spare bis zu 10% + 150€ Cashback auf MacBooks.',
    color: '#E3F2FD',
    iconColor: '#1565C0',
    category: 'Technik'
  },
  {
    id: '3',
    type: 'tech',
    icon: Headphones,
    title: 'Audio-Schnäppchen',
    content: 'Top Kopfhörer günstig: Vergleiche idealo 🔗 + Geizhals 🔗. Mit Honey 🔗 Browser-Extension zusätzlich 5-10% sparen.',
    color: '#F3E5F5',
    iconColor: '#6A1B9A',
    category: 'Technik'
  },
  {
    id: '4',
    type: 'tech',
    icon: Watch,
    title: 'Smartwatch-Sparen',
    content: 'Apple Watch? Kaufe Vorgängermodelle bei Gravis 🔗 mit Studentenrabatt + Trade Republic 🔗 Cashback. Spare bis zu 25%.',
    color: '#FFF3E0',
    iconColor: '#E65100',
    category: 'Technik'
  },
  {
    id: '5',
    type: 'tech',
    icon: Tv,
    title: 'TV-Preisalarm',
    content: 'Setze Preisalarme bei idealo 🔗. Beste TV-Deals im Januar/Februar vor Super Bowl. Mit Payback 🔗 extra punkten.',
    color: '#E0F7FA',
    iconColor: '#00838F',
    category: 'Technik'
  },
  {
    id: '6',
    type: 'tech',
    icon: Camera,
    title: 'Foto-Equipment',
    content: 'Kameras und Objektive gebraucht auf MPB 🔗 kaufen. Mit DKB 🔗 Kreditkarte 2% Cashback sichern.',
    color: '#E8F5E9',
    iconColor: '#2E7D32',
    category: 'Technik'
  },
  {
    id: '7',
    type: 'tech',
    icon: Gamepad,
    title: 'Gaming-Sparfuchs',
    content: 'PS5/Xbox Games: Nutze MMOGA 🔗 + VPN für günstigere Regionalpreise. Eneba 🔗 für digitale Keys checken.',
    color: '#E3F2FD',
    iconColor: '#1565C0',
    category: 'Technik'
  },
  {
    id: '8',
    type: 'tech',
    icon: Monitor,
    title: 'Monitor-Master',
    content: 'Gaming-Monitore im Bundle mit Grafikkarten bei Alternate 🔗. Newsletter = 10€ + Shoop 🔗 bis 6% Cashback.',
    color: '#F3E5F5',
    iconColor: '#6A1B9A',
    category: 'Technik'
  },
  // Reisen
  {
    id: '9',
    type: 'travel',
    icon: Plane,
    title: 'Flug-Kombination',
    content: 'Buche Flüge über Booking.com 🔗 mit Miles & More 🔗 Karte. Sammle doppelt Meilen und nutze Vivid 🔗 für 3% Cashback.',
    color: '#FFF3E0',
    iconColor: '#E65100',
    category: 'Reisen'
  },
  {
    id: '10',
    type: 'travel',
    icon: Hotel,
    title: 'Hotel-Trick',
    content: 'Vergleiche Hotels auf Booking.com 🔗, rufe dann direkt im Hotel an. Oft 10-15% Rabatt bei Direktbuchung plus Zimmer-Upgrade.',
    color: '#E0F7FA',
    iconColor: '#00838F',
    category: 'Reisen'
  },
  {
    id: '11',
    type: 'travel',
    icon: Car,
    title: 'Mietwagen-Hack',
    content: 'Buche Mietwagen über Check24 🔗 mit Vollkasko. Miles & More 🔗 World Plus für Versicherung sparen.',
    color: '#E8F5E9',
    iconColor: '#2E7D32',
    category: 'Reisen'
  },
  {
    id: '12',
    type: 'travel',
    icon: Train,
    title: 'Bahn-Sparpreis',
    content: 'DB Sparpreis-Finder + BahnCard 25 Young 🔗. Mit Payback 🔗 bei der Buchung punkten.',
    color: '#E3F2FD',
    iconColor: '#1565C0',
    category: 'Reisen'
  },
  {
    id: '13',
    type: 'travel',
    icon: Compass,
    title: 'Last-Minute-Pro',
    content: 'Urlaubspiraten-Deals mit DKB 🔗 oder Barclays 🔗 buchen. Keine Auslandsgebühren + Reiseversicherung.',
    color: '#F3E5F5',
    iconColor: '#6A1B9A',
    category: 'Reisen'
  },
  // Abos
  {
    id: '14',
    type: 'subscription',
    icon: Package,
    title: 'Streaming-Rotation',
    content: 'Rotiere durch Streaming-Dienste statt alle parallel. Mit Familien-Accounts und Student-Rabatten bis zu 70% sparen.',
    color: '#FFF3E0',
    iconColor: '#E65100',
    category: 'Abos'
  },
  {
    id: '15',
    type: 'subscription',
    icon: Gift,
    title: 'Abo-Stacking',
    content: 'Kombiniere Amazon Prime 🔗 Student mit Spotify 🔗 Premium Student und Apple One 🔗. Spart über 50%.',
    color: '#E0F7FA',
    iconColor: '#00838F',
    category: 'Abos'
  },
  {
    id: '16',
    type: 'subscription',
    icon: Wallet,
    title: 'Handy-Vertrag',
    content: 'Vergleiche auf Check24 🔗 + Wechselbonus nutzen. Mit Shoop 🔗 bis zu 60€ Cashback extra.',
    color: '#E8F5E9',
    iconColor: '#2E7D32',
    category: 'Abos'
  },
  {
    id: '17',
    type: 'subscription',
    icon: Receipt,
    title: 'Versicherungs-Check',
    content: 'Clark 🔗 für Versicherungsvergleich. Bis zu 40% sparen durch Bündelung bei einem Anbieter.',
    color: '#E3F2FD',
    iconColor: '#1565C0',
    category: 'Abos'
  },
  // Alltag
  {
    id: '18',
    type: 'daily',
    icon: ShoppingCart,
    title: 'Supermarkt-Kombi',
    content: 'Maximiere Rabatte: Lidl Plus 🔗 + Payback 🔗 Karte + Vivid 🔗 Super Deals. Spare bis zu 20% pro Einkauf.',
    color: '#F3E5F5',
    iconColor: '#6A1B9A',
    category: 'Alltag'
  },
  {
    id: '19',
    type: 'daily',
    icon: Store,
    title: 'Drogerie-Hack',
    content: 'dm 🔗 App + Rossmann 🔗 App gleichzeitig. Vergleiche Angebote und nutze Preisgarantie. Plus: Payback 🔗.',
    color: '#FFF3E0',
    iconColor: '#E65100',
    category: 'Alltag'
  },
  {
    id: '20',
    type: 'daily',
    icon: Coffee,
    title: 'Kaffee-Sparen',
    content: 'Hole Starbucks 🔗 mit eigenem Becher: 30 Cent sparen. Mit Vivid 🔗 Super Deals bis zu 10% Cashback.',
    color: '#E0F7FA',
    iconColor: '#00838F',
    category: 'Alltag'
  },
  {
    id: '21',
    type: 'daily',
    icon: Pizza,
    title: 'Takeaway-Taktik',
    content: 'Lieferando 🔗 Pro + Vivid 🔗 Metal: Keine Liefergebühr + 5% Cashback. Spare bis zu 10€ pro Bestellung.',
    color: '#E8F5E9',
    iconColor: '#2E7D32',
    category: 'Alltag'
  },
  {
    id: '22',
    type: 'daily',
    icon: Utensils,
    title: 'Restaurant-Rabatt',
    content: 'OpenTable 🔗 Punkte + American Express 🔗 Angebote kombinieren. Bis zu 25% Rabatt möglich.',
    color: '#E3F2FD',
    iconColor: '#1565C0',
    category: 'Alltag'
  },
  // Kleidung
  {
    id: '23',
    type: 'fashion',
    icon: Shirt,
    title: 'Fashion-Timing',
    content: 'Winterkleidung im Januar/Februar, Sommermode im Juli/August. Mit AboutYou 🔗 + Vivid 🔗 bis zu 70% sparen.',
    color: '#F3E5F5',
    iconColor: '#6A1B9A',
    category: 'Kleidung'
  },
  {
    id: '24',
    type: 'fashion',
    icon: Gift,
    title: 'Outlet-Plus',
    content: 'Zalando Lounge 🔗 mit Newsletter-Gutschein und Trade Republic 🔗 Karte. Extra Rabatt plus 1% Cashback.',
    color: '#FFF3E0',
    iconColor: '#E65100',
    category: 'Kleidung'
  },
  {
    id: '25',
    type: 'fashion',
    icon: ShoppingBag,
    title: 'Premium-Marken',
    content: 'Breuninger 🔗 Sale + Shoop 🔗 Cashback + Newsletter. Designer-Mode bis zu 60% günstiger.',
    color: '#E0F7FA',
    iconColor: '#00838F',
    category: 'Kleidung'
  },
  {
    id: '26',
    type: 'fashion',
    icon: Sparkles,
    title: 'Luxus-Schnäppchen',
    content: 'Mytheresa 🔗 First-Sale + American Express 🔗 Punkte. Luxusmarken bis zu 50% reduziert.',
    color: '#E8F5E9',
    iconColor: '#2E7D32',
    category: 'Kleidung'
  },
  // Additional Tech Tips
  {
    id: '27',
    type: 'tech',
    icon: Laptop,
    title: 'Refurbished Geräte',
    content: '**BackMarket** 🔗 und **asgoodasnew** 🔗 für geprüfte Refurbished-Geräte. Mit **Trade Republic** 🔗 Karte zusätzlich 1% Cashback.',
    color: '#E8F5E9',
    iconColor: '#2E7D32',
    category: 'Technik'
  },
  {
    id: '28',
    type: 'tech',
    icon: Monitor,
    title: 'Student Tech Benefits',
    content: 'Nutze **Amazon Prime Student** 🔗 + **Unidays** 🔗 für bis zu 20% auf Apple, Samsung und mehr. Zusätzlich mit **DKB** 🔗 zahlen für 2% Cashback.',
    color: '#E3F2FD',
    iconColor: '#1565C0',
    category: 'Technik'
  },
  // Additional Travel Tips
  {
    id: '29',
    type: 'travel',
    icon: Globe,
    title: 'Flug-Preisalarm',
    content: '**Google Flights** 🔗 Preisalarm + **Miles & More** 🔗 Kreditkarte. Spare bis zu 40% und sammle doppelt Meilen.',
    color: '#F3E5F5',
    iconColor: '#6A1B9A',
    category: 'Reisen'
  },
  {
    id: '30',
    type: 'travel',
    icon: Calendar,
    title: 'Hotel-Schnäppchen',
    content: 'Buche Hotels über **Booking.com** 🔗 mit **Genius Level 3** Status. Kombiniere mit **American Express** 🔗 für 5% Cashback.',
    color: '#FFF3E0',
    iconColor: '#E65100',
    category: 'Reisen'
  },
  // Additional Subscription Tips
  {
    id: '31',
    type: 'subscription',
    icon: Film,
    title: 'Streaming-Bundle',
    content: '**Disney+** 🔗 Jahresabo + **Amazon Prime** 🔗 Student + **Netflix** 🔗 Premium Sharing. Spare über 60% im Jahr.',
    color: '#E0F7FA',
    iconColor: '#00838F',
    category: 'Abos'
  },
  {
    id: '32',
    type: 'subscription',
    icon: Music,
    title: 'Musik-Spartrick',
    content: '**Spotify Premium Duo** 🔗 teilen oder **Apple Music** 🔗 Familienabo. Mit **PayPal** 🔗 zahlen für Extra-Cashback.',
    color: '#E8F5E9',
    iconColor: '#2E7D32',
    category: 'Abos'
  },
  // Additional Daily Tips
  {
    id: '33',
    type: 'daily',
    icon: ShoppingBasket,
    title: 'Clever Einkaufen',
    content: '**Lidl Plus** 🔗 + **Payback** 🔗 + **Vivid** 🔗 Super Deals kombinieren. Nutze Too Good To Go für -70% bei Lebensmitteln.',
    color: '#E3F2FD',
    iconColor: '#1565C0',
    category: 'Alltag'
  },
  {
    id: '34',
    type: 'daily',
    icon: Percent,
    title: 'Drogerie-Kombi',
    content: '**dm** 🔗 Coupons + **Rossmann** 🔗 App + **Payback** 🔗. Spare bis zu 25% bei Drogerieartikeln.',
    color: '#F3E5F5',
    iconColor: '#6A1B9A',
    category: 'Alltag'
  },
  // Additional Fashion Tips
  {
    id: '35',
    type: 'fashion',
    icon: Card,
    title: 'Fashion Cashback',
    content: '**AboutYou** 🔗 über **Shoop** 🔗 + **Trade Republic** 🔗 Karte. Kombiniere mit Newsletter-Gutschein für bis zu 20% Extra-Rabatt.',
    color: '#FFF3E0',
    iconColor: '#E65100',
    category: 'Kleidung'
  },
  {
    id: '36',
    type: 'fashion',
    icon: Gift,
    title: 'Premium Outlet',
    content: '**Zalando Lounge** 🔗 + **Vivid** 🔗 Super Deals. Designer-Mode bis zu 80% günstiger plus 5% Cashback.',
    color: '#E0F7FA',
    iconColor: '#00838F',
    category: 'Kleidung'
  }
];

export default function TipsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Alle Tipps');

  const filteredTips = selectedCategory === 'Alle Tipps' 
    ? TIPS 
    : TIPS.filter(tip => tip.category === selectedCategory);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Animated.View 
        entering={FadeInDown.duration(600).delay(100)}
        style={styles.header}
      >
        <View style={styles.titleContainer}>
          <Lightbulb size={28} color="#2DC6C9" strokeWidth={1.5} />
          <Text style={styles.title}>Smarte Spartipps</Text>
        </View>
        <Text style={styles.subtitle}>
          für deinen Alltag
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
                category.name === selectedCategory && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category.name)}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                category.name === selectedCategory && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <ScrollView
        style={styles.tipsContainer}
        contentContainerStyle={styles.tipsContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTips.map((tip, index) => (
          <Animated.View
            key={tip.id}
            entering={FadeInDown.duration(400).delay(300 + index * 100)}
          >
            <TouchableOpacity
              style={[styles.tipCard, { backgroundColor: tip.color }]}
              activeOpacity={0.95}
            >
              <View style={[styles.iconContainer, { backgroundColor: tip.iconColor }]}>
                <tip.icon size={24} color="#FFFFFF" strokeWidth={1.5} />
              </View>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipContent}>{tip.content}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <Animated.View
          entering={FadeInDown.duration(400).delay(800)}
          style={styles.gptNote}
        >
          <Text style={styles.gptNoteText}>
            Diese Tipps wurden automatisch von deinem SparCoach generiert.
          </Text>
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
  tipsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tipsContent: {
    padding: 20,
    gap: 16,
  },
  tipCard: {
    borderRadius: 16,
    padding: 20,
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  tipContent: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 22,
  },
  gptNote: {
    marginTop: 8,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  gptNoteText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
});