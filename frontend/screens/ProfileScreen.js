import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image,ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Import useRoute hook
import ProgressRing from './Progesschart'; // Import ProgressRing component

const ProfileScreen = () => {
  const route = useRoute(); // Use the useRoute hook to access the route object
  const { leetCodeData,username } = route.params;
  // Assuming leetCodeData is the API response object



  return (
    <ImageBackground
      source={require('../assets/bg2.png')}
      style={styles.background}
      imageStyle={{opacity: 0.18}}
    >
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {/* Main row */}
        <View style={styles.row}>
          {/* Left card (photo) */}
          <View style={[styles.card, styles.leftCard]}>
            {/* Content of left card */}
            <View style={[styles.halfCard, styles.photoContent]}>
              {/* Image or any other content */}
              <Image
                source={require('../assets/leet.png')}
                style={styles.image}
              />
              <Text>{username}</Text>
            </View>
          </View>
          {/* Right cards */}
          <View style={styles.rightCards}>
            {/* First right card */}
            <View style={[styles.card, styles.rightCard]}>
              <Text style={styles.cardTitle}>Total Solved: <Text style={styles.cardTitle22}>{leetCodeData.totalSolved}</Text></Text>
            </View>
            {/* Second right card */}
            <View style={[styles.card, styles.rightCard]}>
              <Text style={styles.cardTitle}>Your Rank: <Text style={styles.cardTitle22}>{leetCodeData.ranking}</Text></Text>
            </View>
            {/* Third right card */}
            <View style={[styles.card, styles.rightCard]}>
              <Text style={styles.cardTitle}>Contest Rating: <Text style={styles.cardTitle22}>{leetCodeData.contributionPoint}</Text></Text>
            </View>
          </View>
        </View>

        
        <ProgressRing easyCount={leetCodeData.easySolved} mediumCount={leetCodeData.mediumSolved} hardCount={leetCodeData.hardSolved} />


        {/* Render recently solved problems */}
        <View style={styles.recentProblemsContainer}>
          <Text style={styles.recentProblemsTitle}>Recently Solved Problems</Text>
          <ScrollView style={styles.scrollView}>
            {leetCodeData.recentSubmissions.map((submission, index) => (
              <View key={index} style={styles.problemCard}>
                <Text style={styles.problemTitle}>{submission.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20, // Adjust as needed
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  leftCard: {
    marginRight: 10,
    marginLeft: 10,
    flex: 0.6, // Takes 2/3 of the row
    height: 140,
    padding: 20,
    borderWidth:1,
    elevation: 15,

  },
  rightCards: {
    flex: 1, // Takes 1/3 of the row
    flexDirection: 'column',
    marginRight: 10,
   
  },
  cardTitle22:{
    color:'rgb(26, 0, 146)',
    fontWeight:'bold',
  },
  rightCard: {
    marginBottom: 5,
    elevation: 15,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  halfCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContent: {},
  recentProblemsContainer: {
    marginTop: 20,
  },
  recentProblemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 300,
  },
  problemCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 8,
  },
  image: {
    width: 60,
    height: 80,
    resizeMode: 'cover',
  },
});

export default ProfileScreen;
