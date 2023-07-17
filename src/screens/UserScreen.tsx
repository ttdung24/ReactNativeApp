import { Avatar, Divider, Layout, List, ListItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { AuthProps, useAuth } from '../context/AuthContext';

interface IListItem {
    id: number,
    title: string
}



const handlePress = (item: IListItem, value: AuthProps) => {
    switch (item.id) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            value.handleState?.(false);
            break;
    }
}

const UserScreen = () => {
    const value = useAuth()
    const user = useSelector((state: RootState) => state.account.user)
    const data = [{id: 1, title: 'Quản lý tài khoản'}, {id: 2, title: 'Logout'}, {id: 3, title: 'Logout'}]

    const renderItem = ({ item, index }: {item: IListItem; index: number}): React.ReactElement => (
        <ListItem 
            title={`${item.title}`} 
            onPress={() => handlePress(item, value)}
        />
    );

    return (
        <Layout style={{ flex: 1 }}>
            <Layout style={styles.avatar}>
                <Avatar 
                    size='giant'
                    source={require('../../public/avatar/user.png')}
                    style={styles.imageAva}
                />
                <Text style={styles.avaName}>{user?.name}</Text>
            </Layout>

            <List
                style={styles.container}
                data={data}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />   
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
      maxHeight: 180,
    },
    avatar: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageAva: {
        width: 100,
        height: 100
    },
    avaName: {
        padding: 20,
    }
  });

export default UserScreen;