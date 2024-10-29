import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import { ProgressChart } from "react-native-chart-kit";

const ProgressRing = ({ easyCount, mediumCount, hardCount }) => {
  // Calculate the total count
  const totalCount = easyCount + mediumCount + hardCount;

  // Scale the values to fit a range of 0 to 10 for each category
  const easyPercentage = (easyCount / totalCount);
  const mediumPercentage = (mediumCount / totalCount) ;
  const hardPercentage = (hardCount / totalCount);
  console.log(easyPercentage,mediumPercentage,hardPercentage)
  const data = {
    labels: [`Hard: ${hardCount}            `, `Medium: ${mediumCount}      `, `Easy: ${easyCount}            `],
    data: [hardPercentage, mediumPercentage,easyPercentage],
  };

  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "transparent",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 0, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <ProgressChart
        data={data}
        width={Dimensions.get("window").width}
        height={200}
        strokeWidth={10}
        radius={10}
        chartConfig={chartConfig}
        hideLegend={false}
        style={{ marginLeft: -70 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "transparent",
  },
});

export default ProgressRing;
