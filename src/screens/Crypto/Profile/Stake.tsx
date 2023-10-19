import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { HStack, NavigationAction, VStack } from 'components';
import ListItem from 'components/list';
import { TopNavigation } from '@ui-kitten/components';
import { timer } from 'utils/arrayFilter';

const Stake = () => {
    const stake_page = useSelector((state) => state.stake_page);

    const [floader, setfLoader] = React.useState(false);
    const [displayCount, setDisplayCount] = React.useState(3);

    const handleShowMore = () => {
        setDisplayCount(displayCount + 3);
    };

    return (
        <View style={{ paddingTop: 40 }}>
            <TopNavigation
                appearance="control"
                title={() => <Text category="callout">Stake</Text>}
                accessoryLeft={() => (
                    <NavigationAction status="primary" icon="arrow_left" />
                )}

            />
            <ScrollView>
                <VStack mh={24}>
                    {floader ? (
                        <ActivityIndicator
                            size={"large"}
                            style={{ alignSelf: "center" }}
                            color={"#00FFFF"}
                        />
                    ) :

                        stake_page?.stakedData?.length > 0 ? (
                            stake_page?.stakedData?.slice(0, displayCount)?.map(
                                //@ts-ignore
                                (item, i) => {
                                    return (
                                        <VStack
                                            key={i}
                                            border={12}
                                            level="2"
                                            margin={0}
                                            padding={16}
                                            mb={12}
                                        >
                                            <HStack itemsCenter mb={8}>
                                                <Text category="c1">Staked BXG</Text>
                                                <Text category="c1" status="info">
                                                    {item.bxg}
                                                </Text>
                                            </HStack>
                                            <HStack itemsCenter mb={8}>
                                                <Text category="c1">Staked Time</Text>
                                                <Text category="c1" status="warning">
                                                    {timer(item.stake_time)}
                                                </Text>
                                            </HStack>
                                            <HStack itemsCenter mb={8}>
                                                <Text category="c1">Staked Date </Text>
                                                <Text category="c1" status="success">
                                                    {new Date(item.stake_time).toLocaleString()}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    );
                                }
                            )
                        ) : (
                            <Text style={{ alignSelf: "center" }} status="primary">
                                No stake History Found.
                            </Text>
                        )}

                    {!floader && displayCount < stake_page?.stakedData?.length && (
                        <Button title="Show More" onPress={handleShowMore} />
                    )}
                </VStack>
            </ScrollView>
        </View >
    )
}

export default Stake

const styles = StyleSheet.create({})