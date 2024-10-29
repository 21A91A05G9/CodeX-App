import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native';

const ContestList = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchContests = async () => {
      try {
        // Fetch contests from the API
        const response = await fetch('https://clist.by/api/v4/contest/?username=prudhvi_k&api_key=1e6592935ee5971b957483567fad26f3cd41da15');
        const data = await response.json();
        // Filter contests for specific coding platforms
        const filteredContests = data.objects.filter(contest => {
          return ['leetcode.com', 'geeksforgeeks.org', 'codeforces.com', 'codechef.com'].includes(contest.resource);
        });

        // Sort contests by end time (latest first)
        filteredContests.sort((a, b) => new Date(b.end) - new Date(a.end));

        // Filter contests based on remaining time (up to two weeks)
        const now = new Date();
        const twoWeeksLater = new Date(now.getTime() + (14 * 24 * 60 * 60 * 1000)); // 14 days later
        const contestsToDisplay = filteredContests.filter(contest => new Date(contest.end) <= twoWeeksLater);

        setContests(contestsToDisplay);
        setLoading(false); // Turn off loading state
      } catch (error) {
        console.error('Error fetching contests:', error);
        setLoading(false); // Turn off loading state in case of error
      }
    };

    fetchContests();
  }, []);

  // Function to calculate remaining time in hours and minutes
  const calculateRemainingTime = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  // Render each contest item
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => Linking.openURL(item.href)}>
      <View style={styles.contestCard}>
        <Image source={getImageSource(item.resource)} style={styles.platformImage} />
        <View style={styles.contestDetails}>
          <Text style={styles.contestName}>{item.event}</Text>
          {/* <Text style={styles.remainingTime}>{calculateRemainingTime(item.end)} left</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Function to get image source based on coding platform
  const getImageSource = (platform) => {
    switch (platform) {
      case 'leetcode.com':
        return require('../assets/leet.png');
      case 'geeksforgeeks.org':
        return require('../assets/gfg1.png');
      case 'codeforces.com':
        return require('../assets/codeforces.png');
      case 'codechef.com':
        return require('../assets/chef.png');
      default:
        return null;
    }
  };

  // Render loading spinner while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Contests</Text>
      <FlatList
        data={contests}
        renderItem={renderItem}
        keyExtractor={contest => contest.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  contestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 10,
  },
  platformImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  contestDetails: {
    flex: 1,
  },
  contestName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  remainingTime: {
    color: '#777',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ContestList;
