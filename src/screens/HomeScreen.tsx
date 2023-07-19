import { Card, Layout, List, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const HomeScreen = () => {

    const todos = useSelector((state: RootState) => state.todo)

    const renderItemHeader = (headerProps: any, info: any): React.ReactElement => (
        <View {...headerProps}>
            <Text category='h5'>
                {`${info.item.title}`}
            </Text>
        </View>
    );
    
    
    const renderItem = (info: any): React.ReactElement => (
        <Card
            style={styles.item}
            status='info'
            header={headerProps => renderItemHeader(headerProps, info)}
        >
            <Text 
                style={styles.desText}
                category='p1'
            >
                {info.item.description}
            </Text>
            <Text style={styles.timeText}>
                {`${info.item.time} ${info.item.day}`}
            </Text>
        </Card>
    );


    return (
        <Layout 
            style={styles.container}
            level='4'
        >
            <Text 
                category='h2'
                style={styles.topText}
            >
                Todo List
            </Text>
            <List
                style={styles.listContainer}
                contentContainerStyle={styles.contentContainer}
                data={todos}
                renderItem={renderItem}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    topText: {
        fontSize: 32,
        textAlign: 'center',
    },
    listContainer: {
        marginTop: 20,
        maxHeight: 1000,
        backgroundColor: '#E4E9F2',
    
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    item: {
        marginVertical: 4,
        borderRadius: 10,
    },
    desText: {
        fontSize: 20
    },
    timeText: {
        marginTop: 8,
        fontStyle: 'italic'
    }
})

export default HomeScreen;