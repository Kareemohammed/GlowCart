import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1E1E1E' : '#FDEAE7' },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#000' }]}
        >
          Profile
        </Text>
        <TouchableOpacity>
          <Feather
            name="more-horizontal"
            size={22}
            color={isDarkMode ? '#fff' : '#333'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.userCard,
            { backgroundColor: isDarkMode ? '#2C2C2C' : '#fff' },
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/ProfileImg.png')}
              style={styles.avatar}
            />

            <View style={{ marginLeft: 12 }}>
              <Text
                style={[
                  styles.userName,
                  { color: isDarkMode ? '#fff' : '#000' },
                ]}
              >
                Mohammed Kareem S
              </Text>
              <Text
                style={[
                  styles.userEmail,
                  { color: isDarkMode ? '#bbb' : '#777' },
                ]}
              >
                Kareemohammedofficial@gmail.com
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Feather
              name="edit-2"
              size={18}
              color={isDarkMode ? '#fff' : '#333'}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: isDarkMode ? '#2C2C2C' : '#fff' },
          ]}
        >
          <View style={styles.itemRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                name="moon-outline"
                size={20}
                color={isDarkMode ? '#fff' : '#333'}
              />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={[
                    styles.itemTitle,
                    { color: isDarkMode ? '#fff' : '#000' },
                  ]}
                >
                  Dark Mode
                </Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#ccc', true: '#B04E53' }}
              thumbColor="#fff"
            />
          </View>
          <ProfileItem
            icon="location-outline"
            title="Address"
            subtitle="Manage your saved address"
            isDarkMode={isDarkMode}
          />
          <ProfileItem
            icon="receipt-outline"
            title="Order History"
            subtitle="View your past orders"
            isDarkMode={isDarkMode}
          />
          <ProfileItem
            icon="language-outline"
            title="Language"
            isDarkMode={isDarkMode}
          />

          <ProfileItem
            icon="notifications-outline"
            title="Notifications"
            isDarkMode={isDarkMode}
          />
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: isDarkMode ? '#2C2C2C' : '#fff' },
          ]}
        >
          <ProfileItem
            icon="person-outline"
            title="Contact Us"
            isDarkMode={isDarkMode}
          />
          <ProfileItem
            icon="help-circle-outline"
            title="Get Help"
            isDarkMode={isDarkMode}
          />
          <ProfileItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            isDarkMode={isDarkMode}
          />
          <ProfileItem
            icon="document-text-outline"
            title="Terms and Conditions"
            isDarkMode={isDarkMode}
          />
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: isDarkMode ? '#2C2C2C' : '#fff' },
          ]}
        >
          <TouchableOpacity style={styles.logoutRow}>
            <Icon name="log-out-outline" size={20} color="#E94F4F" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function ProfileItem({ icon, title, subtitle, isDarkMode }) {
  return (
    <TouchableOpacity style={styles.itemRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={icon} size={20} color={isDarkMode ? '#fff' : '#333'} />
        <View style={{ marginLeft: 12 }}>
          <Text
            style={[styles.itemTitle, { color: isDarkMode ? '#fff' : '#000' }]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.itemSubtitle,
                { color: isDarkMode ? '#bbb' : '#777' },
              ]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <Icon
        name="chevron-forward"
        size={18}
        color={isDarkMode ? '#bbb' : '#999'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 30 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  userCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  userName: { fontSize: 16, fontWeight: '700' },
  userEmail: { fontSize: 12 },
  section: {
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemTitle: { fontSize: 14, fontWeight: '600' },
  itemSubtitle: { fontSize: 12 },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E94F4F',
    marginLeft: 8,
  },
});
