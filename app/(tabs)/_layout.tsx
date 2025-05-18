import { Tabs } from 'expo-router';
import { Chrome as Home, Sparkles, Bookmark, Calendar, Lightbulb } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2DC6C9',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 84,
          paddingBottom: 28,
          paddingTop: 12,
          shadowColor: '#000000',
          shadowOpacity: 0.06,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
          fontFamily: 'Inter-Regular',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={22} color={color} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: 'KI-Coach',
          tabBarIcon: ({ color }) => <Sparkles size={22} color={color} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: 'Spartipps',
          tabBarIcon: ({ color }) => <Lightbulb size={22} color={color} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Sparkalender',
          tabBarIcon: ({ color }) => <Calendar size={22} color={color} strokeWidth={1.5} />,
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color }) => <Bookmark size={22} color={color} strokeWidth={1.5} />,
        }}
      />
    </Tabs>
  );
}