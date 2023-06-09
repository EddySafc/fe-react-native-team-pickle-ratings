import { View, Button, StyleSheet } from "react-native";

const ExecuteButtons = ({
  players,
  setPlayers,
  setDisableGenerateButton,
  disableGenerateButton,
  setTeamOne,
  teamOne,
  setTeamTwo,
  teamTwo,
  setTeamOneAverageRating,
  setTeamTwoAverageRating,
  setModalIsVisible,
}) => {
  const generateTeams = () => {
    setTeamOne([]);
    setTeamTwo([]);

    let teamOneCount = 0;
    let teamOneRatingTotal = 0;
    let teamOneAverageRating = 0;
    let teamTwoCount = 0;
    let teamTwoRatingTotal = 0;
    let teamTwoAverageRating = 0;
    let currentPlayerCount = 0;
    let currentRatingTotal = 0;
    let averageRating = 0;

    players.forEach((player) => {
      let randomNumber = Math.random();
      let playerName = player.playerName;
      let playerRating = player.playerRating;

      currentPlayerCount++;
      currentRatingTotal = playerRating - -currentRatingTotal;
      averageRating = currentRatingTotal / currentPlayerCount;

      if (randomNumber >= 0.5) {
        if (teamOneCount < 5) {
          setTeamOne((currentTeam) => [...currentTeam, playerName]);
          teamOneCount++;
          teamOneRatingTotal = playerRating - -teamOneRatingTotal;
          teamOneAverageRating = teamOneRatingTotal / teamOneCount;
        } else {
          setTeamTwo((currentTeam) => [...currentTeam, playerName]);
          teamTwoCount++;
          teamTwoRatingTotal = playerRating - -teamTwoRatingTotal;
          teamTwoAverageRating = teamTwoRatingTotal / teamTwoCount;
        }
      }
      if (randomNumber < 0.5) {
        if (teamTwoCount < 5) {
          setTeamTwo((currentTeam) => [...currentTeam, playerName]);
          teamTwoCount++;
          teamTwoRatingTotal = playerRating - -teamTwoRatingTotal;
          teamTwoAverageRating = teamTwoRatingTotal / teamTwoCount;
        } else {
          setTeamOne((currentTeam) => [...currentTeam, playerName]);
          teamOneCount++;
          teamOneRatingTotal = playerRating - -teamOneRatingTotal;
          teamOneAverageRating = teamOneRatingTotal / teamOneCount;
        }
      }

      console.log(
        "currentPlayerCount:",
        currentPlayerCount,
        "playerName:",
        playerName,
        "playerRating:",
        playerRating,
        "averageRating:",
        averageRating,
        "teamOne:",
        teamOne,
        "teamOneCount:",
        teamOneCount,
        "teamOneAverageRating:",
        teamOneAverageRating,
        "teamTwo:",
        teamTwo,
        "teamTwoCount:",
        teamTwoCount,
        "teamTwoAverageRating:",
        teamTwoAverageRating
      );
    });

    setTeamOneAverageRating(teamOneAverageRating);
    setTeamTwoAverageRating(teamTwoAverageRating);
    if (
      teamOneAverageRating - teamTwoAverageRating < 0.8 &&
      teamOneAverageRating - teamTwoAverageRating > -0.8
    ) {
      setDisableGenerateButton(true);
      setModalIsVisible(true);
    } else generateTeams();
  };

  return (
    <View style={styles.bottom_buttons}>
      <View style={styles.buttons}>
        <Button
          title="Pickle Teams!"
          color={"#DE8700"}
          onPress={generateTeams}
          disabled={disableGenerateButton}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title="Clear Players"
          color={"darkred"}
          onPress={() => {
            setPlayers([]);
            setDisableGenerateButton(true);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom_buttons: { flexDirection: "row" },
  buttons: { paddingLeft: 32, paddingRight: 10 },
});

export default ExecuteButtons;
